import {CurrentPlayer} from "../../domain/application/player/CurrentPlayer";
import {MyCustomDate} from "../../domain/model/shared/MyCustomDate";

export interface ISaveCurrentPlayerAttributesListUseCase {
    handle(currentPlayers: CurrentPlayer[], savedAt: MyCustomDate): Promise<void>
}