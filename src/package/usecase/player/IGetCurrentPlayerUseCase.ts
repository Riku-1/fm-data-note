import {MyCustomDate} from "../../domain/model/shared/MyCustomDate";
import {CurrentPlayer} from "../../domain/model/player/CurrentPlayer";

export interface IGetCurrentPlayerUseCase {
    handle(playerId: number, savedAt: MyCustomDate): Promise<CurrentPlayer|null>
}
