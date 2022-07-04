import React, {useState, MouseEvent, useEffect, useMemo} from 'react';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {canSaveCurrentPlayer, CurrentPlayer} from "../../package/domain/application/player/CurrentPlayer";
import {LeftMenuPanel} from "../component/shared/LeftMenuPanel";
import nationMaster from "../../asset/nation/nation.json"

export const LoadHtmlFilePage = () => {
    const [players, setPlayers] = useState<CurrentPlayer[]>([])
    const [columnDefs, setColumnDefs] = useState([])
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
                { field: 'birthDate' },
            ])
        })()
    }, [])

    const rowClassRules = useMemo(() => {
        return {
            'invalid-status': (params) => {
                return !canSaveCurrentPlayer(params.data)
            },
        };
    }, [])


    const parsePlayersHtmlFile = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const players = await window.exposedAPI.loadPlayersFile()
        console.log(players)
        setPlayers(players)
    }

    const saveCurrentPlayerAttributesList = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (!players.every(player => canSaveCurrentPlayer(player))) {
            alert('不正な選手情報が存在します。情報を修正してください。')
            return
        }

        await window.exposedAPI.saveCurrentPlayerAttributesList(players, new Date()).catch(_ => {
            alert('保存に失敗しました。')
        })
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
                <button type="button" onClick={parsePlayersHtmlFile}>open a file</button>

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
