import {Player} from "./Player";
import {PlayerAttributesHistory} from "./PlayerAttributesHistory";

export class PlayerFactory {
    public fromRepository(playerRawObj: any, attributeHistoriesRawObj: any[]): Player {
        const attributesHistories: PlayerAttributesHistory[] = attributeHistoriesRawObj.map(history => {
            return {
                club: history.club,
                onLoanFrom: history.onLoanFrom,
                savedAt: new Date(history.savedAt),
            }
        })

        return {
            id: playerRawObj.uid,
            name: playerRawObj.name,
            country: playerRawObj.country,
            birthDate: undefined, // TODO
            attributesHistories: attributesHistories,
        }
    }
}