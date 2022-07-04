import {PlayerAttributesHistory} from "./PlayerAttributesHistory";

export type Player = {
    id: number
    name: string
    nation: string,
    attributesHistories: PlayerAttributesHistory[],
    birthDate?: Date
}
