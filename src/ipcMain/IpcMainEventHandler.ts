import {dialog, ipcMain} from "electron"
import {
    getClubsEvent,
    getClubsPlayersEvent,
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

@injectable()
export class IpcMainEventHandler {
    private _LoadPlayersHtmlUseCase: ILoadPlayersHtmlUseCase
    private _savePlayerUseCase: ISaveCurrentPlayerAttributesListUseCase
    private _getClubsPlayersUseCase: IGetClubsPlayerUseCase
    private _getClubsUseCase: IGetClubsUseCase
    private _saveClubUseCase: ISaveClubUseCase

    constructor(
        @inject(USECASE_TYPE.ParseHtmlStringToPlayersUseCase) parseHtmlStringToPlayersUseCase: ILoadPlayersHtmlUseCase,
        @inject(USECASE_TYPE.SaveCurrentPlayerAttributesListUseCase) savePlayersUseCase: ISaveCurrentPlayerAttributesListUseCase,
        @inject(USECASE_TYPE.GetClubsPlayersUseCase) getClubsPlayerUseCase: IGetClubsPlayerUseCase,
        @inject(USECASE_TYPE.GetClubsUseCase) getClubsUseCase: IGetClubsUseCase,
        @inject(USECASE_TYPE.SaveClubUseCase) saveClubUseCase: ISaveClubUseCase,
    ) {
        this._LoadPlayersHtmlUseCase = parseHtmlStringToPlayersUseCase
        this._savePlayerUseCase = savePlayersUseCase
        this._getClubsPlayersUseCase = getClubsPlayerUseCase
        this._getClubsUseCase = getClubsUseCase
        this._saveClubUseCase = saveClubUseCase
    }

    public handleAllEvent() {
        this.handleUploadPlayersFile()
        this.handleSaveCurrentPlayerAttributesList()
        this.handleGetClubsPlayers()
        this.handleSaveClub()
        this.handleGetClubs()
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

    private handleSaveCurrentPlayerAttributesList(): void {
        ipcMain.handle(saveCurrentPlayerAttributesListEvent, async (_, players: CurrentPlayer[], savedAt: Date) => {
            return this._savePlayerUseCase.handle(players, savedAt).catch(err => {
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