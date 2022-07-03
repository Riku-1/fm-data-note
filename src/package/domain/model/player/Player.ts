import {PlayerAttributesHistory} from "./PlayerAttributesHistory";

export type Player = {
    id: number
    name: string
    country: string // TODO
    attributesHistories: PlayerAttributesHistory[]
}