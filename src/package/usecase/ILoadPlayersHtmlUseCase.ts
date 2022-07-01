import {Player} from "../domain/model/player/Player";

export interface ILoadPlayersHtmlUseCase {
    handle(filePath: string) : Player[]
}