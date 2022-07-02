import {Player} from "./Player";

export interface IPlayerRepository {
    save(player: Player): Promise<void>
}