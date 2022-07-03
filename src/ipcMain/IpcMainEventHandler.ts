import {dialog, ipcMain} from "electron"
import {getClubsPlayersEvent, loadPlayersFileEvent, savePlayersEvent} from "./electronEvent";
import {inject, injectable} from "inversify";
import {ILoadPlayersHtmlUseCase} from "../package/usecase/player/ILoadPlayersHtmlUseCase";
import {USECASE_TYPE} from "../package/inject_types/diConfig/usecase_type";
import {ISavePlayersUseCase} from "../package/usecase/player/ISavePlayersUseCase";
import {Player} from "../package/domain/model/player/Player";
import {IGetClubsPlayerUseCase} from "../package/usecase/player/IGetClubsPlayerUseCase";

@injectable()
export class IpcMainEventHandler {
    private _LoadPlayersHtmlUseCase: ILoadPlayersHtmlUseCase
    private _savePlayerUseCase: ISavePlayersUseCase
    private _getClubsPlayersUseCase: IGetClubsPlayerUseCase

    constructor(
        @inject(USECASE_TYPE.ParseHtmlStringToPlayersUseCase) parseHtmlStringToPlayersUseCase: ILoadPlayersHtmlUseCase,
        @inject(USECASE_TYPE.SavePlayersUseCase) savePlayersUseCase: ISavePlayersUseCase,
        @inject(USECASE_TYPE.GetClubsPlayersUseCase) getClubsPlayerUseCase: IGetClubsPlayerUseCase,
    ) {
        this._LoadPlayersHtmlUseCase = parseHtmlStringToPlayersUseCase
        this._savePlayerUseCase = savePlayersUseCase
        this._getClubsPlayersUseCase = getClubsPlayerUseCase
    }

    public handleAllEvent() {
        this.handleUploadPlayersFile()
        this.handleSavePlayers()
        this.handleGetClubsPlayers()
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
            return this._savePlayerUseCase.handle(players).catch(err => {
                throw err
            })
        })
    }

    private handleGetClubsPlayers(): void {
        ipcMain.handle(getClubsPlayersEvent, async (_, club: string, savedAt: Date) => {
            return this._getClubsPlayersUseCase.handle(club, savedAt).catch(err => {
                throw err
            })
        })
    }
}