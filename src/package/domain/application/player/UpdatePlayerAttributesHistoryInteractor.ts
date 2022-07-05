import {CurrentPlayer} from "../../model/player/CurrentPlayer";
import {IUpdatePlayerAttributesHistoryUseCase} from "../../../usecase/player/IUpdatePlayerAttributesHistoryUseCase";
import {inject, injectable} from "inversify";
import {IPlayerRepository} from "../../model/player/IPlayerRepository";
import {REPOSITORY_TYPES} from "../../../inject_types/diConfig/repisoty_types";

@injectable()
export class UpdatePlayerAttributesHistoryInteractor implements IUpdatePlayerAttributesHistoryUseCase {
    private _repository: IPlayerRepository

    constructor(
        @inject(REPOSITORY_TYPES.PlayerRepository) repository
    ) {
        this._repository = repository
    }


    async handle(currentPlayer: CurrentPlayer): Promise<void> {
        await this._repository.updatePlayerAttributesHistory(currentPlayer)
    }
}