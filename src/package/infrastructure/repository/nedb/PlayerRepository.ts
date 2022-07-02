import {injectable} from "inversify";
import {IPlayerRepository} from "../../../domain/model/player/IPlayerRepository";
import {Player} from "../../../domain/model/player/Player";
import {NeDBContainer} from "./NeDBContainer";

@injectable()
export class PlayerRepository implements IPlayerRepository {
    async save(player: Player): Promise<void> {
        const dbContainer = await NeDBContainer.getInstance()

        dbContainer.player.insert(player)
    }
}