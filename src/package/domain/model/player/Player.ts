import {PlayerAttributesHistory} from "./PlayerAttributesHistory";
import {isSameDate, MyCustomDate} from "../shared/MyCustomDate";

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

export const getAttributesHistoryAtDate = (player: Player, date: MyCustomDate): PlayerAttributesHistory|null => {
    return player.attributesHistories.find(history => isSameDate(history.savedAt, date)) ?? null
}