import {Container} from "inversify";
import {ILoadPlayersHtmlUseCase} from "../../usecase/player/ILoadPlayersHtmlUseCase";
import {USECASE_TYPE} from "./usecase_type";
import {LoadPlayersHtmlInteractor} from "../../domain/application/player/LoadPlayersHtmlInteractor";
import {IPlayerRepository} from "../../domain/model/player/IPlayerRepository";
import {REPOSITORY_TYPES} from "./repisoty_types";
import {PlayerRepository} from "../../infrastructure/repository/sqlite3/PlayerRepository";
import {ISaveCurrentPlayerAttributesListUseCase} from "../../usecase/player/ISaveCurrentPlayerAttributesListUseCase";
import {SaveCurrentPlayerAttributesListInteractor} from "../../domain/application/player/SaveCurrentPlayerAttributesListInteractor";
import {IGetClubsPlayerUseCase} from "../../usecase/player/IGetClubsPlayerUseCase";
import {GetClubsPlayerInteractor} from "../../domain/application/player/GetClubsPlayerInteractor";
import {IClubRepository} from "../../domain/model/club/IClubRepository";
import {ClubRepository} from "../../infrastructure/repository/sqlite3/ClubRepository";
import {ISaveClubUseCase} from "../../usecase/club/ISaveClubUseCase";
import {SaveClubInteractor} from "../../domain/application/club/SaveClubInteractor";
import {IGetClubsUseCase} from "../../usecase/club/IGetClubsUseCase";
import {GetClubsInteractor} from "../../domain/application/club/GetClubsInteractor";
import {IGetCurrentPlayerUseCase} from "../../usecase/player/IGetCurrentPlayerUseCase";
import {GetCurrentPlayerInteractor} from "../../domain/application/player/GetCurrentPlayerInteractor";
import {IUpdatePlayerAttributesHistoryUseCase} from "../../usecase/player/IUpdatePlayerAttributesHistoryUseCase";
import {
    UpdatePlayerAttributesHistoryInteractor
} from "../../domain/application/player/UpdatePlayerAttributesHistoryInteractor";

export const DIContainer = new Container()

// UseCase
DIContainer.bind<ILoadPlayersHtmlUseCase>(USECASE_TYPE.ParseHtmlStringToPlayersUseCase).to(LoadPlayersHtmlInteractor)
DIContainer.bind<ISaveCurrentPlayerAttributesListUseCase>(USECASE_TYPE.SaveCurrentPlayerAttributesListUseCase).to(SaveCurrentPlayerAttributesListInteractor)
DIContainer.bind<IGetCurrentPlayerUseCase>(USECASE_TYPE.GetCurrentPlayerUseCase).to(GetCurrentPlayerInteractor)
DIContainer.bind<IGetClubsPlayerUseCase>(USECASE_TYPE.GetClubsPlayersUseCase).to(GetClubsPlayerInteractor)
DIContainer.bind<IGetClubsUseCase>(USECASE_TYPE.GetClubsUseCase).to(GetClubsInteractor)
DIContainer.bind<ISaveClubUseCase>(USECASE_TYPE.SaveClubUseCase).to(SaveClubInteractor)
DIContainer.bind<IUpdatePlayerAttributesHistoryUseCase>(USECASE_TYPE.UpdatePlayerAttributesHistoryUseCase).to(UpdatePlayerAttributesHistoryInteractor)

// Repository
DIContainer.bind<IPlayerRepository>(REPOSITORY_TYPES.PlayerRepository).to(PlayerRepository)
DIContainer.bind<IClubRepository>(REPOSITORY_TYPES.ClubRepository).to(ClubRepository)
