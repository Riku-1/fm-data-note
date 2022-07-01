import React, {useState, useEffect, MouseEvent} from 'react';
import './App.css';
import {Player} from "../package/domain/model/player/Player";
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const {exposedAPI} = window;

export const App = () => {
    const [count, setCount] = useState(0);
    const [players, setPlayers] = useState<Player[]>([])

    const onCountDown = () => setCount((count) => count - 1);

    useEffect(() => {
        exposedAPI.update(count);
    }, [count]);

    const parsePlayersHtmlFile = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const players = await window.exposedAPI.loadPlayersFile()

        setPlayers(players)
    }

    const [columnDefs] = useState([
        { field: 'id' },
        { field: 'name' },
    ])

    return (
        <div className="container">
            <button type="button" onClick={parsePlayersHtmlFile}>Open a File</button>


            <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
                <AgGridReact
                    rowData={players}
                    columnDefs={columnDefs}>
                </AgGridReact>
            </div>

            {/**
            <table>
                <thead>
                <tr>
                    <td>id</td>
                    <td>name</td>
                </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => {
                      return (
                          <tr key={index}>
                              <td>{player.id}</td>
                              <td>{player.name}</td>
                          </tr>
                      )
                  })}
                </tbody>
            </table>
            */}
            <div>
                <button onClick={onCountDown}>&#x25BC;</button>
            </div>
        </div>
    );
};
