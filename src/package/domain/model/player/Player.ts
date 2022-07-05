import {PlayerAttributesHistory} from "./PlayerAttributesHistory";
import {MyCustomDate} from "../shared/MyCustomDate";

export type Player = {
    id: number
    name: string
    nation: string,
    attributesHistories: PlayerAttributesHistory[],
    birthDate: MyCustomDate
}

export const getHistoryDateList = (player: Player) => {
    return player.attributesHistories.map(history => history.savedAt)
}
