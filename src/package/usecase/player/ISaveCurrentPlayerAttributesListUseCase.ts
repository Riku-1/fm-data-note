import {CurrentPlayer} from "../../domain/model/player/CurrentPlayer";

export interface ISaveCurrentPlayerAttributesListUseCase {
    handle(currentPlayers: CurrentPlayer[]): Promise<void>
}