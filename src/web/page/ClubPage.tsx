import React, {MouseEvent, useState} from "react";
import {LeftMenuPanel} from "./shared/LeftMenuPanel";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Club, validateForSaveClub} from "../../package/domain/model/club/Club";
import nationsMaster from "../../asset/nation/nation.json"

export const ClubPage = () => {
    const [newClubId, setNewClubId] = useState<number>(0)
    const [newClubName, setNewClubName] = useState<string>("")
    const [newClubTrivialName, setNewClubTrivialName] = useState<string>("")
    const [newClubNation, setNewClubNation] = useState<string>("")

    const saveClub = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const newClub: Club = { id: newClubId, name: newClubName, trivialName: newClubTrivialName, nation: newClubNation }
        try {
            validateForSaveClub(newClub)
        } catch (e) {
            alert(e)
            return
        }

        await window.exposedAPI.saveClub(newClub).then(_ => {
            alert('保存しました。')
        }).catch(_ => {
            alert('保存に失敗しました。')
        })
    }

    return (
        <div id="container">
            <div id="left-menu-panel">
                <LeftMenuPanel/>
            </div>

            <div id="main-content">
                <TextField label="ID" value={newClubId} type="number" onChange={event => setNewClubId(Number(event.target.value))}/>
                <TextField label="クラブ名" value={newClubName} onChange={event => setNewClubName(event.target.value)}/>
                <TextField label="慣用名" value={newClubTrivialName} onChange={event => setNewClubTrivialName(event.target.value)}/>

                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="nation">国</InputLabel>
                    <Select labelId="nation" label="国" value={newClubNation} onChange={event => setNewClubNation(event.target.value)}>
                        <MenuItem value={""}>
                            <em>None</em>
                        </MenuItem>
                        {nationsMaster.map((nation, nationIndex) => {
                            return <MenuItem key={nationIndex} value={nation["alpha-3"]}>{nation.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <button type="button" onClick={saveClub}>Save club</button>
            </div>
        </div>
    )


}