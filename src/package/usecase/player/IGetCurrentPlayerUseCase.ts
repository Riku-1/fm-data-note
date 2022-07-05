import {MyCustomDate} from "../../domain/model/shared/MyCustomDate";
import {CurrentPlayer} from "../../domain/application/player/CurrentPlayer";

export interface IGetCurrentPlayerUseCase {
    handle(playerId: number, savedAt: MyCustomDate): Promise<CurrentPlayer|null>
}
