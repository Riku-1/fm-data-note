import {isSameDate, MyCustomDate} from "../../model/shared/MyCustomDate";
import {inject, injectable} from "inversify";
import {IClubRepository} from "../../model/club/IClubRepository";
import {IPlayerRepository} from "../../model/player/IPlayerRepository";
import {REPOSITORY_TYPES} from "../../../inject_types/diConfig/repisoty_types";
import {CurrentPlayer} from "../../model/player/CurrentPlayer";
import {IGetCurrentPlayerUseCase} from "../../../usecase/player/IGetCurrentPlayerUseCase";

@injectable()
export class GetCurrentPlayerInteractor implements IGetCurrentPlayerUseCase {
    private _playerRepository: IPlayerRepository
    private _clubRepository: IClubRepository

    constructor(
        @inject(REPOSITORY_TYPES.PlayerRepository) playerRepository: IPlayerRepository,
        @inject(REPOSITORY_TYPES.ClubRepository) clubRepository: IClubRepository,
    ) {
        this._playerRepository = playerRepository
        this._clubRepository = clubRepository
    }


    async handle(playerId: number, savedAt: MyCustomDate): Promise<CurrentPlayer|null> {
        // TODO: change to domain service
        const player = await this._playerRepository.find(playerId)
        const historyAtDate = player.attributesHistories.find(history => isSameDate(history.savedAt, savedAt))

        if (!historyAtDate) {
            return null
        }

        const club = historyAtDate.clubId
            ? await this._clubRepository.find(historyAtDate.clubId)
            : null

        const onLoanFrom = historyAtDate.onLoanFromClubId
            ? await this._clubRepository.find(historyAtDate.onLoanFromClubId)
            : null

        return {
            id: player.id,
            nation: player.nation,
            name: player.name,
            birthDate: player.birthDate,
            currentClubId: club?.id ?? null,
            currentClub: club?.trivialName ?? null,
            currentLoanFromId: onLoanFrom?.id ?? null,
            currentLoanFrom: onLoanFrom?.trivialName ?? null,
            homeGrownStatus: historyAtDate.homeGrownStatus,
            isMember: historyAtDate.isMember,
            isPlanToRelease: historyAtDate.isPlanToRelease,
            savedAt: historyAtDate.savedAt,
        }
    }

}