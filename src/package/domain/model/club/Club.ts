export type Club = {
    id: number,
    name: string,
    trivialName: string,
    nation: string
}

// NOTE: 慣用名に対してクラブが複数ある可能性を考え、配列を返すものとする
export const getClubFromTrivialName = (trivialName: string, clubs: Club[]): Club[] => {
    if (!trivialName) {
        return null
    }

    return clubs.filter((club) => {
        return club.trivialName === trivialName
    })
}

export const validateForSaveClub = (club: Club) => {
    if (!club.id) {
        throw new Error('idが不正です。')
    }

    if (!club.name) {
        throw new Error("名前は必須です。")
    }

    if (!club.trivialName) {
        throw new Error("慣用名は必須です。")
    }

    if (!club.nation) {
        throw new Error("国が設定されていません。")
    }
}