import React, {useState, MouseEvent} from 'react';
import {Player} from "../../package/domain/model/player/Player";
import {AgGridReact} from "ag-grid-react";
import {LeftMenuPanel} from "../component/shared/LeftMenuPanel";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const LoadHtmlFilePage = () => {
    const [players, setPlayers] = useState<Player[]>([])

    const parsePlayersHtmlFile = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const players = await window.exposedAPI.loadPlayersFile()
        setPlayers(players)
    }

    const savePlayers = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        await window.exposedAPI.savePlayers(players)
    }

    const [columnDefs] = useState([
        { field: 'id' },
        { field: 'name' },
        { field: 'country' },
        { field: 'affiliatedTeam' },
    ])

    return (
        <div id="container">
            <div id="left-menu-panel">
                <LeftMenuPanel/>
            </div>

            <div id="main-content">
                <button type="button" onClick={parsePlayersHtmlFile}>open a file</button>

                <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
                    <AgGridReact
                        rowData={players}
                        columnDefs={columnDefs}>
                    </AgGridReact>
                </div>

                <button type="button" onClick={savePlayers}>save players</button>
            </div>
        </div>
    );
};
