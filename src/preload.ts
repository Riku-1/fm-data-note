import { contextBridge, ipcRenderer } from 'electron';
import {getClubsPlayersEvent, loadPlayersFileEvent, savePlayersEvent} from "./ipcMain/electronEvent";
import {Player} from "./package/domain/model/player/Player";

contextBridge.exposeInMainWorld('exposedAPI', {
    loadPlayersFile: () => ipcRenderer.invoke(loadPlayersFileEvent)
        .catch(err => {
            throw err
        }),

    savePlayers: (players: Player[]) => ipcRenderer.invoke(savePlayersEvent, players)
        .catch(err => {
            throw err
        }),

    getClubsPlayers: (club: string, savedAt: Date) => ipcRenderer.invoke(getClubsPlayersEvent, club, savedAt)
        .catch(err => {
            throw err
        })
});
