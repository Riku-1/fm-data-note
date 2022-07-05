import {Player} from "./Player";
import {MyCustomDate} from "../shared/MyCustomDate";
import {CurrentPlayer} from "./CurrentPlayer";

export interface IPlayerRepository {
    find(id: number): Promise<Player|null>

    findByClub(clubId: number): Promise<Player[]>

    findByClubAt(clubId: number, belongsAt: MyCustomDate): Promise<Player[]>

    save(player: Player): Promise<void>

    // TODO: create current player repository and move this function
    updatePlayerAttributesHistory(currentPlayer: CurrentPlayer): Promise<void>
}