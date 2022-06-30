import { contextBridge, ipcRenderer } from 'electron';
import {loadFileEvent} from "./constants/electronEvent";

contextBridge.exposeInMainWorld('myAPI', {
  update: (count: number) => ipcRenderer.send('update-title', count),
  foo: () => ipcRenderer.invoke(loadFileEvent)
});
