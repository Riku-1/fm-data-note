import {Player} from "./Player";
import {MyCustomDate} from "../shared/MyCustomDate";

export interface IPlayerRepository {
    find(id: number): Promise<Player|null>

    findByClub(clubId: number): Promise<Player[]>

    findByClubAt(clubId: number, belongsAt: MyCustomDate): Promise<Player[]>

    save(player: Player): Promise<void>
}