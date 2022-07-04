import { contextBridge, ipcRenderer } from 'electron';
import {
    getClubsEvent,
    getClubsPlayersEvent,
    loadPlayersFileEvent,
    saveClubEvent,
    saveCurrentPlayerAttributesListEvent
} from "./ipcMain/electronEvent";
import {Club} from "./package/domain/model/club/Club";
import {CurrentPlayer} from "./package/domain/application/player/CurrentPlayer";

contextBridge.exposeInMainWorld('exposedAPI', {
    loadPlayersFile: () => ipcRenderer.invoke(loadPlayersFileEvent)
        .catch(err => {
            throw err
        }),

    saveCurrentPlayerAttributesList: (players: CurrentPlayer[], savedAt: Date) => ipcRenderer.invoke(saveCurrentPlayerAttributesListEvent, players, savedAt)
        .catch(err => {
            throw err
        }),

    getClubsPlayers: (club: string, savedAt: Date) => ipcRenderer.invoke(getClubsPlayersEvent, club, savedAt)
        .catch(err => {
            throw err
        }),

    getClubs: () => ipcRenderer.invoke(getClubsEvent)
        .catch(err => {
            throw err
        }),

    saveClub: (club: Club) => ipcRenderer.invoke(saveClubEvent, club)
        .catch(err => {
            throw err
        }),
});
