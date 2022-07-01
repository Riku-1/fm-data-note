import { contextBridge, ipcRenderer } from 'electron';
import {loadPlayersFileEvent} from "./ipcMain/electronEvent";

contextBridge.exposeInMainWorld('exposedAPI', {
  update: (count: number) => ipcRenderer.send('update-title', count),
  loadPlayersFile: () => ipcRenderer.invoke(loadPlayersFileEvent)
});
