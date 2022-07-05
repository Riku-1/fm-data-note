import {dialog, ipcMain} from "electron"
import {
    getClubsEvent,
    getClubsPlayersEvent, getCurrentPlayerEvent,
    loadPlayersFileEvent,
    saveClubEvent,
    saveCurrentPlayerAttributesListEvent
} from "./electronEvent";
import {inject, injectable} from "inversify";
import {ILoadPlayersHtmlUseCase} from "../package/usecase/player/ILoadPlayersHtmlUseCase";
import {
    ISaveCurrentPlayerAttributesListUseCase
} from "../package/usecase/player/ISaveCurrentPlayerAttributesListUseCase";
import {IGetClubsPlayerUseCase} from "../package/usecase/player/IGetClubsPlayerUseCase";
import {ISaveClubUseCase} from "../package/usecase/club/ISaveClubUseCase";
import {USECASE_TYPE} from "../package/inject_types/diConfig/usecase_type";
import {CurrentPlayer} from "../package/domain/application/player/CurrentPlayer";
import {Club} from "../package/domain/model/club/Club";
import {IGetClubsUseCase} from "../package/usecase/club/IGetClubsUseCase";
import {MyCustomDate} from "../package/domain/model/shared/MyCustomDate";
import {IGetCurrentPlayerUseCase} from "../package/usecase/player/IGetCurrentPlayerUseCase";

@injectable()
export class IpcMainEventHandler {
    private _LoadPlayersHtmlUseCase: ILoadPlayersHtmlUseCase
    private _savePlayerUseCase: ISaveCurrentPlayerAttributesListUseCase
    private _getCurrentPlayerUseCase: IGetCurrentPlayerUseCase
    private _getClubsPlayersUseCase: IGetClubsPlayerUseCase
    private _getClubsUseCase: IGetClubsUseCase
    private _saveClubUseCase: ISaveClubUseCase

    constructor(
        @inject(USECASE_TYPE.ParseHtmlStringToPlayersUseCase) parseHtmlStringToPlayersUseCase: ILoadPlayersHtmlUseCase,
        @inject(USECASE_TYPE.SaveCurrentPlayerAttributesListUseCase) savePlayersUseCase: ISaveCurrentPlayerAttributesListUseCase,
        @inject(USECASE_TYPE.GetClubsPlayersUseCase) getClubsPlayerUseCase: IGetClubsPlayerUseCase,
        @inject(USECASE_TYPE.GetCurrentPlayerUseCase) getCurrentPlayerUseCase: IGetCurrentPlayerUseCase,
        @inject(USECASE_TYPE.GetClubsUseCase) getClubsUseCase: IGetClubsUseCase,
        @inject(USECASE_TYPE.SaveClubUseCase) saveClubUseCase: ISaveClubUseCase,
    ) {
        this._LoadPlayersHtmlUseCase = parseHtmlStringToPlayersUseCase
        this._savePlayerUseCase = savePlayersUseCase
        this._getCurrentPlayerUseCase = getCurrentPlayerUseCase
        this._getClubsPlayersUseCase = getClubsPlayerUseCase
        this._getClubsUseCase = getClubsUseCase
        this._saveClubUseCase = saveClubUseCase
    }

    public handleAllEvent() {
        this.handleUploadPlayersFile()
        this.handleSaveCurrentPlayerAttributesList()
        this.handleGetCurrentPlayer()
        this.handleGetClubsPlayers()
        this.handleSaveClub()
        this.handleGetClubs()
    }

    private handleUploadPlayersFile(): void {
        ipcMain.handle(loadPlayersFileEvent, async (_, savedAt: MyCustomDate) => {
            const {canceled, filePaths} = await dialog.showOpenDialog({})
            if (canceled) {
                return
            }

            return this._LoadPlayersHtmlUseCase.handle(filePaths[0], savedAt)
        })
    }

    private handleSaveCurrentPlayerAttributesList(): void {
        ipcMain.handle(saveCurrentPlayerAttributesListEvent, async (_, players: CurrentPlayer[]) => {
            return this._savePlayerUseCase.handle(players).catch(err => {
                throw err
            })
        })
    }

    private handleGetCurrentPlayer(): void {
        ipcMain.handle(getCurrentPlayerEvent, async (_, playerId: number, savedAt: MyCustomDate) => {
            return this._getCurrentPlayerUseCase.handle(playerId, savedAt).catch(err => {
                throw err
            })
        })
    }

    private handleGetClubsPlayers(): void {
        ipcMain.handle(getClubsPlayersEvent, async (_, clubId: number) => {
            return this._getClubsPlayersUseCase.handle(clubId).catch(err => {
                throw err
            })
        })
    }

    private handleGetClubs(): void {
        ipcMain.handle(getClubsEvent, async (_) => {
            return this._getClubsUseCase.handle().catch(err => {
                throw err
            })
        })
    }

    private handleSaveClub(): void {
        ipcMain.handle(saveClubEvent, async (_, club: Club) => {
            return this._saveClubUseCase.handle(club).catch(err => {
                throw err
            })
        })
    }
}