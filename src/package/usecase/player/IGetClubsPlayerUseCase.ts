import {Player} from "../../domain/model/player/Player";

export interface IGetClubsPlayerUseCase {
    handle(clubId: number): Promise<Player[]>
}
