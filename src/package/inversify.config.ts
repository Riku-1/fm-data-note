import {Container} from "inversify";
import {IParseHtmlStringToPlayersUseCase} from "./usecase/IParseHtmlStringToPlayersUseCase";
import {USECASE_TYPE} from "./usecase/usecase_type";
import {ParseHtmlStrToPlayersInteractor} from "./domain/application/player/ParseHtmlStrToPlayersInteractor";

export const DIContainer = new Container()

// UseCase
DIContainer.bind<IParseHtmlStringToPlayersUseCase>(USECASE_TYPE.ParseHtmlStringToPlayersUseCase).to(ParseHtmlStrToPlayersInteractor)