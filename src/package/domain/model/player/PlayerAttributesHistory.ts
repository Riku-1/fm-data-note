import {MyCustomDate} from "../shared/MyCustomDate";
import {HomeGrownStatus} from "./HomeGrownStatus";

export type PlayerAttributesHistory = {
    clubId: number|null
    onLoanFromClubId: number|null
    homeGrownStatus: HomeGrownStatus
    isMember: boolean
    isPlanToRelease: boolean
    memo: string
    savedAt: MyCustomDate
}
