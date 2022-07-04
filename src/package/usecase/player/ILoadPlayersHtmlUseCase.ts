import {CurrentPlayer} from "../../domain/application/player/CurrentPlayer";

export interface ILoadPlayersHtmlUseCase {
    handle(filePath: string) : Promise<CurrentPlayer[]>
}