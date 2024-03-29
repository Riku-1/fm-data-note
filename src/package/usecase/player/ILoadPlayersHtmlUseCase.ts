import {CurrentPlayer} from "../../domain/model/player/CurrentPlayer";
import {MyCustomDate} from "../../domain/model/shared/MyCustomDate";

export interface ILoadPlayersHtmlUseCase {
    handle(filePath: string, savedAt: MyCustomDate) : Promise<CurrentPlayer[]>
}