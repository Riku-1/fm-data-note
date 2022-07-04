import {ISaveCurrentPlayerAttributesListUseCase} from "../../../usecase/player/ISaveCurrentPlayerAttributesListUseCase";
import {inject, injectable} from "inversify";
import {Player} from "../../model/player/Player";
import {REPOSITORY_TYPES} from "../../../inject_types/diConfig/repisoty_types";
import {IPlayerRepository} from "../../model/player/IPlayerRepository";
import {CurrentPlayer} from "./CurrentPlayer";

@injectable()
export class SaveCurrentPlayerAttributesListInteractor implements ISaveCurrentPlayerAttributesListUseCase {
    private _repository: IPlayerRepository

    constructor(
        @inject(REPOSITORY_TYPES.PlayerRepository) repository
    ) {
        this._repository = repository
    }

    async handle(currentPlayers: CurrentPlayer[], savedAt: Date): Promise<void> {
        for (const currentPlayer of currentPlayers) {
            const savedPlayer = await this._repository.find(currentPlayer.id).catch(err => {
                throw err
            })

            if (savedPlayer) {
                // do nothing if player already exists
                // TODO: update
                continue
            }

            const player: Player = {
                id: currentPlayer.id,
                name: currentPlayer.name,
                nation: currentPlayer.nation,
                birthDate: currentPlayer.birthDate,
                attributesHistories: [{
                    clubId: currentPlayer.currentClubId,
                    onLoanFromClubId: currentPlayer.currentLoanFromId,
                    savedAt: savedAt,
                }]
            }

            await this._repository.save(player).catch(err => {
                throw err
            })
        }
    }
}
