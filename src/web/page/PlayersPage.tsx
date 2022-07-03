import React, {useEffect, useState} from "react";
import {LeftMenuPanel} from "../component/shared/LeftMenuPanel";
import {Player} from "../../package/domain/model/player/Player";
import {AgGridReact} from "ag-grid-react";

export const PlayersPage = () => {
    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        window.exposedAPI.getClubsPlayers('Nosta', new Date())
            .then(players => {
                setPlayers(players)
            })
    })

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
                  <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
                      <AgGridReact
                          rowData={players}
                          columnDefs={columnDefs}>
                      </AgGridReact>
                  </div>
              </div>
         </div>
     )
}
