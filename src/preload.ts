import { contextBridge, ipcRenderer } from 'electron';
import {loadPlayersFileEvent, savePlayersEvent} from "./ipcMain/electronEvent";
import {Player} from "./package/domain/model/player/Player";

contextBridge.exposeInMainWorld('exposedAPI', {
  loadPlayersFile: () => ipcRenderer.invoke(loadPlayersFileEvent),
  savePlayers: (players: Player[]) => ipcRenderer.invoke(savePlayersEvent, players)
      .catch(err => {
        throw err
      }),
});
