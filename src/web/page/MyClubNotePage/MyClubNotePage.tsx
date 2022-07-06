import React, {useEffect, useMemo, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {getHistoryDateList, Player} from "../../../package/domain/model/player/Player";
import {LeftMenuPanel} from "../shared/LeftMenuPanel";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Club} from "../../../package/domain/model/club/Club";
import {fromHyphenYYYYMMDD, toHyphenYYYYMMDD} from "../../../package/domain/model/shared/MyCustomDate";
import {CurrentPlayer, getAge} from "../../../package/domain/model/player/CurrentPlayer";
import {HomeGrownStatus} from "../../../package/domain/model/player/HomeGrownStatus";
import {AgGridCheckBox} from "../shared/ag-grid/AgGridCheckBox";
import {Summary} from "./Summary";
import {TextInput} from "../shared/ag-grid/TextInput";

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

    const onCellValueChanged = (params) => {
        setCurrentPlayers([...currentPlayers])

        window.exposedAPI.updatePlayerAttributesHistory(params.data)
            .catch(_ => {
                alert('保存に失敗しました。')
            })
    }

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

            setCurrentPlayers(currentPlayers.filter(player => player !== null))
        })()
    }, [selectedDate])

    const [columnDefs] = useState([
        {
            field: 'name',
            resizable: true,
        },
        {
            field: 'isMember',
            cellRenderer: AgGridCheckBox,
            sortable: true,
            resizable: true,
            width: 60,
        },
        {
            field: 'isPlanToRelease',
            cellRenderer: AgGridCheckBox,
            sortable: true,
            resizable: true,
            width: 60,
        },
        {
            type: 'numericColumn',
            field: 'age',
            sortable: true,
            resizable: true,
            width: 60,
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
            resizable: true,
            width: 80,
        },
        {
            field: 'currentClub',
            sortable: true,
            resizable: true,
            width: 100,
        },
        {
            field: 'currentLoanFrom',
            sortable: true,
            resizable: true,
            width: 100,
        },
        {
            field: 'homeGrownStatus',
            cellClassRules: {
                excellent: params => params.value === HomeGrownStatus.Club,
                good: params => params.value === HomeGrownStatus.Nation,
            },
            sortable: true,
            resizable: true,
            width: 100,
        },
        {
            field: 'memo',
            cellRenderer: TextInput,
            cellEditorPopup: true,
            width: 600,
            editable: true,
            autoHeight: true
        }
    ])

    const rowClassRules = useMemo(() => {
        return {
            'gray-background': (params) => params.data.isPlanToRelease
        }
    }, [])

    const defaultColDef = {
        suppressKeyboardEvent: (_) => true,
    }

    return (
        <div id="container">
            <div id="left-menu-panel">
                <LeftMenuPanel/>
            </div>

            <div id="main-content">
                <Summary currentPlayers={currentPlayers}/>

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
                        onCellValueChanged={onCellValueChanged}
                        defaultColDef={defaultColDef}
                    >
                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}
