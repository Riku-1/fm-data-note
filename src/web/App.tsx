import React, {useState, useEffect, ChangeEvent, MouseEvent} from 'react';
import './App.css';
import {Player} from "../domain/model/Player/Player";
import {Input} from "@mui/material";

const {myAPI} = window;

export const App = () => {
    const [count, setCount] = useState(0);
    const [players, setPlayers] = useState<Player[]>([])
    const [fileContent, setFileContent] = useState('')
    const [filePath, setFilePath] = useState('')

    const onCountDown = () => setCount((count) => count - 1);

    const addPlayer = () => {
        const player: Player = {id: 1, name: 'test'}
        setPlayers([...players, player])
    }

    useEffect(() => {
        myAPI.update(count);
    }, [count]);

    const parseFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) {
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            setFileContent(reader.result?.toString() ?? 'No Content')
        }

        reader.readAsText(file)
    }

    const testFoo = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const file = await window.myAPI.foo()
        console.log(file)
        setFilePath(file)
    }

    return (
        <div className="container">
            <button type="button" onClick={testFoo}>Open a File</button>
            File path: <div>{filePath}</div>
            <Input id="upload-file-button" onChange={parseFile} type="file"/>

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
            <h1>{fileContent}</h1>
            <div>
                <button onClick={onCountDown}>&#x25BC;</button>
                <button onClick={addPlayer}>&#x25B2;</button>
            </div>
        </div>
    );
};
