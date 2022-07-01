import {IEEventHandler} from "../package/domain/application/IEEventHandler";
import {dialog, ipcMain} from "electron"
import {loadPlayersFileEvent} from "./electronEvent";
import {inject, injectable} from "inversify";
import {ILoadPlayersHtmlUseCase} from "../package/usecase/ILoadPlayersHtmlUseCase";
import {USECASE_TYPE} from "../package/usecase/usecase_type";

@injectable()
export class IpcMainEventHandler implements IEEventHandler {
    private _LoadPlayersHtmlUseCase: ILoadPlayersHtmlUseCase

    constructor(
        @inject(USECASE_TYPE.ParseHtmlStringToPlayersUseCase) parseHtmlStringToPlayersUseCase: ILoadPlayersHtmlUseCase
    ) {
        this._LoadPlayersHtmlUseCase = parseHtmlStringToPlayersUseCase
    }

    handleUploadPlayersFile(): void {
        ipcMain.handle(loadPlayersFileEvent, async () => {
            const {canceled, filePaths} = await dialog.showOpenDialog({})
            if (canceled) {
                return
            }

            return this._LoadPlayersHtmlUseCase.handle(filePaths[0])
        })
    }
}