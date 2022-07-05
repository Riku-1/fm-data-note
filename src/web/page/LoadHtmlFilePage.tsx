import React, {useState, MouseEvent, useEffect, useMemo} from 'react';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {canSaveCurrentPlayer, CurrentPlayer} from "../../package/domain/application/player/CurrentPlayer";
import {LeftMenuPanel} from "../component/shared/LeftMenuPanel";
import nationMaster from "../../asset/nation/nation.json"
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TextField} from "@mui/material";
import {fromDate, toHyphenYYYYMMDD} from "../../package/domain/model/shared/MyCustomDate";

export const LoadHtmlFilePage = () => {
    const [players, setPlayers] = useState<CurrentPlayer[]>([])
    const [columnDefs, setColumnDefs] = useState([])
    const [savedAt, setSavedAt] = useState<Date|null>(null)

    useEffect(() => {
        (async () => {
            setColumnDefs([
                { field: 'id' },
                { field: 'name' },
                {
                    field: 'nation',
                    editable: true,
                    cellEditor: 'agSelectCellEditor',
                    cellEditorParams: {
                        // 作ったがこの画面でチームはいじれなくていい、別の画面で流用するのでこのままにしておく
                        values: nationMaster.map(nation => nation["alpha-3"]),
                    },
                },
                {
                    field: 'currentClub',
                    editable: true,
                },
                { field: 'currentLoanFrom' },
                {
                    field: 'birthDate',
                    valueGetter: (params) => toHyphenYYYYMMDD(params.data.birthDate),
                },
                {
                    field: 'homeGrownStatus'
                }
            ])
        })()
    }, [])

    const rowClassRules = useMemo(() => {
        return {
            'bad': (params) => {
                return !canSaveCurrentPlayer(params.data)
            },
        };
    }, [])


    const loadPlayersHtmlFile = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (savedAt == null) {
            alert('日付を設定してください。')
            return
        }

        const players = await window.exposedAPI.loadPlayersFile(fromDate(savedAt))
        setPlayers(players)
    }

    const saveCurrentPlayerAttributesList = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (!players?.every(player => canSaveCurrentPlayer(player))) {
            alert('不正な選手情報が存在します。情報を修正してください。')
            return
        }

        if (!savedAt) {
            alert('日時を設定してください。')
            return
        }

        await window.exposedAPI.saveCurrentPlayerAttributesList(players).catch(_ => {
            alert('保存に失敗しました。')
            return
        })

        alert('保存しました。')
    }

    const setPlayer = (player: CurrentPlayer) => {
        const index = players.findIndex(playerState => playerState.id === player.id)
        const replaced = [...players]
        replaced[index] = player
        setPlayers(replaced)
    }

    return (
        <div id="container">
            <div id="left-menu-panel">
                <LeftMenuPanel/>
            </div>

            <div id="main-content">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker onChange={event => {setSavedAt(event)}} value={savedAt} renderInput={(params) => <TextField {...params} />}/>
                </LocalizationProvider>

                <button type="button" onClick={loadPlayersHtmlFile}>open a file</button>

                <div className="ag-theme-alpine" style={{height: "90vh", width: "70vw"}}>
                    <AgGridReact
                        rowData={players}
                        columnDefs={columnDefs}
                        onCellValueChanged={event => {setPlayer(event.data)}}
                        rowClassRules={rowClassRules}
                    >
                    </AgGridReact>
                </div>

                <button type="button" onClick={saveCurrentPlayerAttributesList}>save players</button>
            </div>
        </div>
    );
};
