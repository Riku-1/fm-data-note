import {Player} from "./Player";
import {PlayerAttributesHistory} from "./PlayerAttributesHistory";
import {fromYYYYMMDD} from "../shared/MyCustomDate";

export class PlayerFactory {
    public fromRepository(playerRawObj: any, attributeHistoriesRawObj: any[]): Player {
        const attributesHistories: PlayerAttributesHistory[] = attributeHistoriesRawObj.map(history => {
            return {
                clubId: history.clubId,
                onLoanFromClubId: history.onLoanFromClubId,
                savedAt: fromYYYYMMDD(history.savedAt),
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