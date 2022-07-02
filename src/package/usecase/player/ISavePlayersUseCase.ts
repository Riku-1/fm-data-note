import {Player} from "../../domain/model/player/Player";

export interface ISavePlayersUseCase {
    handle(players: Player[]): void
}