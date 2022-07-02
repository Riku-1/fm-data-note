import {dialog, ipcMain} from "electron"
import {loadPlayersFileEvent, savePlayersEvent} from "./electronEvent";
import {inject, injectable} from "inversify";
import {ILoadPlayersHtmlUseCase} from "../package/usecase/player/ILoadPlayersHtmlUseCase";
import {USECASE_TYPE} from "../package/inject_types/diConfig/usecase_type";
import {ISavePlayersUseCase} from "../package/usecase/player/ISavePlayersUseCase";
import {Player} from "../package/domain/model/player/Player";

@injectable()
export class IpcMainEventHandler {
    private _LoadPlayersHtmlUseCase: ILoadPlayersHtmlUseCase
    private _savePlayerUseCase: ISavePlayersUseCase

    constructor(
        @inject(USECASE_TYPE.ParseHtmlStringToPlayersUseCase) parseHtmlStringToPlayersUseCase: ILoadPlayersHtmlUseCase,
        @inject(USECASE_TYPE.SavePlayersUseCase) savePlayersUseCase: ISavePlayersUseCase,
    ) {
        this._LoadPlayersHtmlUseCase = parseHtmlStringToPlayersUseCase
        this._savePlayerUseCase = savePlayersUseCase
    }

    public handleAllEvent() {
        this.handleUploadPlayersFile()
        this.handleSavePlayers()
    }

    private handleUploadPlayersFile(): void {
        ipcMain.handle(loadPlayersFileEvent, async () => {
            const {canceled, filePaths} = await dialog.showOpenDialog({})
            if (canceled) {
                return
            }

            return this._LoadPlayersHtmlUseCase.handle(filePaths[0])
        })
    }

    private handleSavePlayers(): void {
        ipcMain.handle(savePlayersEvent, async (_, players: Player[]) => {
            return this._savePlayerUseCase.handle(players)
        })
    }
}