import {Container} from "inversify";
import {ILoadPlayersHtmlUseCase} from "./usecase/ILoadPlayersHtmlUseCase";
import {USECASE_TYPE} from "./usecase/usecase_type";
import {LoadPlayersHtmlInteractor} from "./domain/application/player/LoadPlayersHtmlInteractor";

export const DIContainer = new Container()

// UseCase
DIContainer.bind<ILoadPlayersHtmlUseCase>(USECASE_TYPE.ParseHtmlStringToPlayersUseCase).to(LoadPlayersHtmlInteractor)