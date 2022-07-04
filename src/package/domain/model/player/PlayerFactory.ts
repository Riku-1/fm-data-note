import {Player} from "./Player";
import {PlayerAttributesHistory} from "./PlayerAttributesHistory";

export class PlayerFactory {
    public fromRepository(playerRawObj: any, attributeHistoriesRawObj: any[]): Player {
        const attributesHistories: PlayerAttributesHistory[] = attributeHistoriesRawObj.map(history => {
            return {
                clubId: history.clubId,
                onLoanFromClubId: history.onLoanFrom,
                savedAt: new Date(history.savedAt),
            }
        })

        return {
            id: playerRawObj.uid,
            name: playerRawObj.name,
            nation: playerRawObj.nation,
            birthDate: undefined, // TODO
            attributesHistories: attributesHistories,
        }
    }
}