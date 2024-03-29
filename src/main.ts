import "reflect-metadata";
import path from 'path';
import { searchDevtools } from 'electron-search-devtools';
import { BrowserWindow, app, ipcMain, session, screen } from 'electron';
import {IpcMainEventHandler} from "./ipcMain/IpcMainEventHandler";
import { DIContainer } from "./package/inject_types/diConfig/inversify.config"

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.resolve(
      __dirname,
      process.platform === 'win32'
        ? '../node_modules/electron/dist/electron.exe'
        : '../node_modules/.bin/electron'
    ),
  });
}

const createWindow = () => {
  const screenSize = screen.getPrimaryDisplay().size
  const mainWindow = new BrowserWindow({
    width: screenSize.width,
    height: screenSize.height,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.on('update-title', (_e, arg) => {
    mainWindow.setTitle(`Electron React TypeScript: ${arg}`);
  });

  const handler = DIContainer.resolve(IpcMainEventHandler)
  handler.handleAllEvent()

  if (isDev) {
    searchDevtools('REACT')
      .then((devtools) => {
        session.defaultSession.loadExtension(devtools, {
          allowFileAccess: true,
        });
      })
      .catch((err) => console.log(err));

    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.loadFile('dist/index.html');
};

app.whenReady().then(createWindow);
app.once('window-all-closed', () => app.quit());
