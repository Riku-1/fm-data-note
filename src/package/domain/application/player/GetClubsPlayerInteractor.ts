import {IGetClubsPlayerUseCase} from "../../../usecase/player/IGetClubsPlayerUseCase";
import {Player} from "../../model/player/Player";
import {inject, injectable} from "inversify";
import {REPOSITORY_TYPES} from "../../../inject_types/diConfig/repisoty_types";
import {IPlayerRepository} from "../../model/player/IPlayerRepository";

@injectable()
export class GetClubsPlayerInteractor implements IGetClubsPlayerUseCase {
    private _repository: IPlayerRepository

    constructor(
        @inject(REPOSITORY_TYPES.PlayerRepository) repository
    ) {
        this._repository = repository
    }

    async handle(club: string, belongsAt: Date): Promise<Player[]> {
        return await this._repository.findByClub(club, belongsAt)
    }

}