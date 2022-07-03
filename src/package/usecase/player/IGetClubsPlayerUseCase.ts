import {Player} from "../../domain/model/player/Player";

export interface IGetClubsPlayerUseCase {
    handle(club: string, belongsAt: Date): Promise<Player[]>
}
