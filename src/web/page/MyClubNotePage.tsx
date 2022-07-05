import React, {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {getHistoryDateList, Player} from "../../package/domain/model/player/Player";
import {LeftMenuPanel} from "../component/shared/LeftMenuPanel";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Club} from "../../package/domain/model/club/Club";
import {fromHyphenYYYYMMDD, toHyphenYYYYMMDD} from "../../package/domain/model/shared/MyCustomDate";
import {CurrentPlayer} from "../../package/domain/application/player/CurrentPlayer";
import {HomeGrownStatus} from "../../package/domain/model/player/HomeGrownStatus";

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
        { field: 'nation' },
        { field: 'currentClub' },
        { field: 'currentLoanFrom' },
        {
            field: 'homeGrownStatus',
            cellClassRules: {
                excellent: params => params.value === HomeGrownStatus.Club,
                good: params => params.value === HomeGrownStatus.Nation,
            }
        },
    ])

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
                        columnDefs={columnDefs}>
                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}
