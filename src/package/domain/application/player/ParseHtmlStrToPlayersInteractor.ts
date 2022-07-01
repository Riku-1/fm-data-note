import {IParseHtmlStringToPlayersUseCase} from "../../../usecase/IParseHtmlStringToPlayersUseCase";
import {Player} from "../../model/player/Player";
import {injectable} from "inversify";

@injectable()
export class ParseHtmlStrToPlayersInteractor implements IParseHtmlStringToPlayersUseCase {
    handle(htmlStr: string): Player[] {
        return [{id: 1234, name: "aaa"}];
    }
}