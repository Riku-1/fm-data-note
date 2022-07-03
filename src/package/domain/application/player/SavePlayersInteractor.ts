import {ISavePlayersUseCase} from "../../../usecase/player/ISavePlayersUseCase";
import {inject, injectable} from "inversify";
import {Player} from "../../model/player/Player";
import {REPOSITORY_TYPES} from "../../../inject_types/diConfig/repisoty_types";
import {IPlayerRepository} from "../../model/player/IPlayerRepository";

@injectable()
export class SavePlayersInteractor implements ISavePlayersUseCase {
    private _repository: IPlayerRepository

    constructor(
        @inject(REPOSITORY_TYPES.PlayerRepository) repository
    ) {
        this._repository = repository
    }

    async handle(players: Player[]): Promise<void> {
        for (const player of players) {
            const savedPlayer = await this._repository.find(player.id).catch(err => {
                throw err
            })

            if (savedPlayer) {
                // do nothing if player already exists
                // TODO: update
                continue
            }

            await this._repository.save(player).catch(err => {
                throw err
            })
        }
    }
}
