import {IEEventHandler} from "../package/domain/application/IEEventHandler";
import {ipcMain, dialog} from "electron"
import {loadPlayersFileEvent} from "../constants/electronEvent";
import {inject, injectable} from "inversify";
import {IParseHtmlStringToPlayersUseCase} from "../package/usecase/IParseHtmlStringToPlayersUseCase";
import {USECASE_TYPE} from "../package/usecase/usecase_type";

@injectable()
export class IpcMainEventHandler implements IEEventHandler {
    private _parseHtmlStrToPlayersUseCase: IParseHtmlStringToPlayersUseCase

    constructor(
        @inject(USECASE_TYPE.ParseHtmlStringToPlayersUseCase) parseHtmlStringToPlayersUseCase: IParseHtmlStringToPlayersUseCase
    ) {
        this._parseHtmlStrToPlayersUseCase = parseHtmlStringToPlayersUseCase
    }

    handleUploadPlayersFile(): void {
        ipcMain.handle(loadPlayersFileEvent, async () => {
            const {canceled, filePaths} = await dialog.showOpenDialog({})

            if (canceled) {
                return
            }

            return this._parseHtmlStrToPlayersUseCase.handle(filePaths[0])
        })
    }
}