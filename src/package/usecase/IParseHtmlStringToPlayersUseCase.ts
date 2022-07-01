import {Player} from "../domain/model/player/Player";

export interface IParseHtmlStringToPlayersUseCase {
    handle(htmlStr: string) : Player[]
}