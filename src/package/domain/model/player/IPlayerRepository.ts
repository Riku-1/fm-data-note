import {Player} from "./Player";

export interface IPlayerRepository {
    find(id: number): Promise<Player|null>

    findByClub(club: string, belongsAt: Date): Promise<Player[]>

    save(player: Player): Promise<void>
}