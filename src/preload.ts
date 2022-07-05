import { contextBridge, ipcRenderer } from 'electron';
import {
    getClubsEvent,
    getClubsPlayersEvent, getCurrentPlayerEvent,
    loadPlayersFileEvent,
    saveClubEvent,
    saveCurrentPlayerAttributesListEvent
} from "./ipcMain/electronEvent";
import {Club} from "./package/domain/model/club/Club";
import {CurrentPlayer} from "./package/domain/application/player/CurrentPlayer";
import {MyCustomDate} from "./package/domain/model/shared/MyCustomDate";

contextBridge.exposeInMainWorld('exposedAPI', {
    loadPlayersFile: (savedAt: MyCustomDate) => ipcRenderer.invoke(loadPlayersFileEvent, savedAt)
        .catch(err => {
            throw err
        }),

    saveCurrentPlayerAttributesList: (players: CurrentPlayer[]) => ipcRenderer.invoke(saveCurrentPlayerAttributesListEvent, players)
        .catch(err => {
            throw err
        }),

    getCurrentPlayer: (playerId: number, savedAt: MyCustomDate) => ipcRenderer.invoke(getCurrentPlayerEvent, playerId, savedAt)
        .catch(err => {
            throw err
        }),

    getClubsPlayers: (clubId: number) => ipcRenderer.invoke(getClubsPlayersEvent, clubId)
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
