import {CurrentPlayer} from "../../domain/model/player/CurrentPlayer";

export interface IUpdatePlayerAttributesHistoryUseCase {
    handle(currentPlayer: CurrentPlayer): Promise<void>
}