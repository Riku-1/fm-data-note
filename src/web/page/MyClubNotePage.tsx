import React, {MouseEvent, useEffect, useMemo, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {getHistoryDateList, Player} from "../../package/domain/model/player/Player";
import {LeftMenuPanel} from "../component/shared/LeftMenuPanel";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Club} from "../../package/domain/model/club/Club";
import {fromHyphenYYYYMMDD, toHyphenYYYYMMDD} from "../../package/domain/model/shared/MyCustomDate";
import {CurrentPlayer, getAge} from "../../package/domain/model/player/CurrentPlayer";
import {HomeGrownStatus} from "../../package/domain/model/player/HomeGrownStatus";
import {AgGridCheckBox} from "../component/shared/ag-grid/AgGridCheckBox";

export const MyClubNotePage = () => {
    const [myClub, setMyCLub] = useState<Club>({
        id: 130508,
        name: 'Nosta Novotroitsk',
        trivialName: 'Nosta',
        nation: 'RUS'
    })
    const [players, setPlayers] = useState<Player[]>([])
    const [selectableDateList, setSelectableDateList] = useState<string[]>([])
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [currentPlayers, setCurrentPlayers] = useState<CurrentPlayer[]>([])

    useEffect(() => {
        (async () => {
            // get players
            const players = await window.exposedAPI.getClubsPlayers(myClub.id)
            setPlayers(players)

            // get selectable date list from players
            const historyDateLists = players.map(player => getHistoryDateList(player))
            const hyphenDateLists = historyDateLists.map(dateList => {
                return dateList.map(date => toHyphenYYYYMMDD(date))
            })
            const allDateList = hyphenDateLists.reduce((acc, dateList) => {
                return acc.concat(dateList)
            }, [])
            setSelectableDateList(Array.from(new Set(allDateList)))
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const currentPlayers = await Promise.all(
                players.map(async (player) => {
                    return await window.exposedAPI.getCurrentPlayer(player.id, fromHyphenYYYYMMDD(selectedDate))
                })
            )
            console.log(currentPlayers)

            setCurrentPlayers(currentPlayers)
        })()
    }, [selectedDate])

    const [columnDefs] = useState([
        { field: 'id' },
        { field: 'name' },
        {
            field: 'isMember',
            cellRenderer: AgGridCheckBox,
            sortable: true,
        },
        {
            field: 'isPlanToRelease',
            cellRenderer: AgGridCheckBox,
            sortable: true,
        },
        {
            type: 'numericColumn',
            field: 'age',
            sortable: true,
            valueGetter: (params) => {
                if (params.data == null) {
                    return null
                }
                return getAge(params.data)
            }
        },
        {
            field: 'nation',
            sortable: true,
        },
        {
            field: 'currentClub',
            sortable: true,
        },
        {
            field: 'currentLoanFrom',
            sortable: true,
        },
        {
            field: 'homeGrownStatus',
            cellClassRules: {
                excellent: params => params.value === HomeGrownStatus.Club,
                good: params => params.value === HomeGrownStatus.Nation,
            },
            sortable: true,
        },
    ])

    const rowClassRules = useMemo(() => {
        return {
            'gray-background': (params) => params.data.isPlanToRelease
        }
    }, [])

    const updatePlayerAttributesHistories = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        for (const player of currentPlayers) {
            await window.exposedAPI.updatePlayerAttributesHistory(player)
                .catch(_ => {
                    alert('保存に失敗しました。')
                    return
                })
        }
        alert('保存しました。')
    }

    return (
        <div id="container">
            <div id="left-menu-panel">
                <LeftMenuPanel/>
            </div>

            <div id="main-content">
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="selectedDate">日付</InputLabel>
                    <Select labelId="selectedDate" label="日付" value={selectedDate} onChange={event => setSelectedDate(event.target.value)}>
                        <MenuItem value={""}>
                            <em>None</em>
                        </MenuItem>
                        {selectableDateList.map((selectableDate, index) => {
                            return <MenuItem key={index} value={selectableDate}>{selectableDate}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <div className="ag-theme-alpine" style={{height: "90vh", width: "70vw"}}>
                    <AgGridReact
                        rowData={currentPlayers}
                        columnDefs={columnDefs}
                        rowClassRules={rowClassRules}
                    >
                    </AgGridReact>
                </div>

                <button type="button" onClick={updatePlayerAttributesHistories}>save</button>
            </div>
        </div>
    )
}
