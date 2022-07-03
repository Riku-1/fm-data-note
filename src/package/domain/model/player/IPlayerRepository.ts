import {Player} from "./Player";

export interface IPlayerRepository {
    find(id: number): Promise<Player|null>

    save(player: Player): Promise<void>
}