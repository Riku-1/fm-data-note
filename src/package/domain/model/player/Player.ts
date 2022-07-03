import {PlayerAttributesHistory} from "./PlayerAttributesHistory";

export type Player = {
    id: number
    name: string
    country: string // TODO
    attributesHistories: PlayerAttributesHistory[],
    birthDate?: Date
}

export const validateForSavePlayer = (player: Player) => {
    if (!player.birthDate) {
        throw new Error('誕生日を設定していない状態での保存はできません。')
    }

    const everySavedAtIsSet = player.attributesHistories.every(history => {
        return !!history.savedAt
    })
    if (!everySavedAtIsSet) {
        throw new Error('いつの時点のパラメータかを設定する必要があります。')
    }
}
