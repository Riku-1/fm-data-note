import nationMaster from "../../../../asset/nation/nation.json";

export type CurrentPlayer = {
    id: number
    name: string
    nation: string
    currentClub: string|null
    currentClubId: number|null
    currentLoanFrom: string|null
    currentLoanFromId: number|null
    birthDate?: Date
}


export const canSaveCurrentPlayer = (player: CurrentPlayer): boolean => {
    if (player.currentClub && !player.currentClubId) {
        return false
    }

    if (player.currentLoanFrom && !player.currentLoanFromId) {
        return false
    }

    if (!nationMaster.some((nation) => nation["alpha-3"] === player.nation)) {
        return false
    }

    return player.birthDate !== undefined;
}
