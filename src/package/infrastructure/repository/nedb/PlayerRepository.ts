import {injectable} from "inversify";
import {IPlayerRepository} from "../../../domain/model/player/IPlayerRepository";
import {Player} from "../../../domain/model/player/Player";

@injectable()
export class PlayerRepository implements IPlayerRepository {
    save(player: Player): void {
        console.log(player.name)
    }
}