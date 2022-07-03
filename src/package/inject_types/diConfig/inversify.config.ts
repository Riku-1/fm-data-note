import {Container} from "inversify";
import {ILoadPlayersHtmlUseCase} from "../../usecase/player/ILoadPlayersHtmlUseCase";
import {USECASE_TYPE} from "./usecase_type";
import {LoadPlayersHtmlInteractor} from "../../domain/application/player/LoadPlayersHtmlInteractor";
import {IPlayerRepository} from "../../domain/model/player/IPlayerRepository";
import {REPOSITORY_TYPES} from "./repisoty_types";
import {PlayerRepository} from "../../infrastructure/repository/sqlite3/PlayerRepository";
import {ISavePlayersUseCase} from "../../usecase/player/ISavePlayersUseCase";
import {SavePlayersInteractor} from "../../domain/application/player/SavePlayersInteractor";
import {IDBContainer, TYPE_DBContainer} from "../../domain/application/IDBContainer";
import {SqliteContainer} from "../../infrastructure/SqliteContainer";

export const DIContainer = new Container()

// UseCase
DIContainer.bind<ILoadPlayersHtmlUseCase>(USECASE_TYPE.ParseHtmlStringToPlayersUseCase).to(LoadPlayersHtmlInteractor)
DIContainer.bind<ISavePlayersUseCase>(USECASE_TYPE.SavePlayersUseCase).to(SavePlayersInteractor)

// Repository
DIContainer.bind<IPlayerRepository>(REPOSITORY_TYPES.PlayerRepository).to(PlayerRepository)

// DB
DIContainer.bind<IDBContainer>(TYPE_DBContainer).to(SqliteContainer)
