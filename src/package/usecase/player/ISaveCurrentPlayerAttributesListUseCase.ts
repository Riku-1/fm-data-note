import {CurrentPlayer} from "../../domain/application/player/CurrentPlayer";

export interface ISaveCurrentPlayerAttributesListUseCase {
    handle(currentPlayers: CurrentPlayer[]): Promise<void>
}