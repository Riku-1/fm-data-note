import {IEEventHandler} from "../domain/application/IEEventHandler";
import {ipcMain, dialog} from "electron"
import {loadFileEvent} from "../constants/electronEvent";

export class IpcMainEventHandler implements IEEventHandler {
    handleFoo(): void {
        ipcMain.handle(loadFileEvent, async () => {
            const {canceled, filePaths} = await dialog.showOpenDialog({})

            if (canceled) {
                return
            }

            return filePaths[0]
        })
    }
}