import React, {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {Player} from "../../package/domain/model/player/Player";
import {LeftMenuPanel} from "../component/shared/LeftMenuPanel";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import nationsMaster from "../../asset/nation/nation.json";

export const PlayersPage = () => {
    const [nation, setNation] = useState<string>("")
    const [players, setPlayers] = useState<Player[]>([])
    const [savedAt, setSavedAt] = useState<Date|null>(null)

    useEffect(() => {
        window.exposedAPI.getClubsPlayers(130508)
            .then(players => {
                setPlayers(players)
            })
    }, [])

    const [columnDefs] = useState([
        { field: 'id' },
        { field: 'name' },
        { field: 'country' },
        { field: 'club' },
        { field: 'onLoanFrom' },
    ])

     return (
         <div id="container">
              <div id="left-menu-panel">
                   <LeftMenuPanel/>
              </div>

              <div id="main-content">
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                      <InputLabel id="nation">国</InputLabel>
                      <Select labelId="nation" label="国" value={nation} onChange={event => setNation(event.target.value)}>
                          <MenuItem value={""}>
                              <em>None</em>
                          </MenuItem>
                          {nationsMaster.map((nation, nationIndex) => {
                              return <MenuItem key={nationIndex} value={nation["alpha-3"]}>{nation.name}</MenuItem>
                          })}
                      </Select>
                  </FormControl>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker onChange={event => {setSavedAt(event)}} value={savedAt} renderInput={(params) => <TextField {...params} />}/>
                  </LocalizationProvider>

                  <div className="ag-theme-alpine" style={{height: "90vh", width: "70vw"}}>
                      <AgGridReact
                          rowData={players}
                          columnDefs={columnDefs}>
                      </AgGridReact>
                  </div>
              </div>
         </div>
     )
}
