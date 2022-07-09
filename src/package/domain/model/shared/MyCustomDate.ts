export type MyCustomDate = {
    year: number
    month: number
    day: number
}

export const fromDate = (date: Date): MyCustomDate => {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    }
}

export const toYYYYMMDD = (date: MyCustomDate): string => {
    return date.year
        + String(date.month).padStart(2, '0')
        + String(date.day).padStart(2, '0')
}

export const toHyphenYYYYMMDD = (date: MyCustomDate): string => {
    return date.year
        + '-'
        + String(date.month).padStart(2, '0')
        + '-'
        + String(date.day).padStart(2, '0')
}

export const fromYYYYMMDD = (yyyymmdd: string): MyCustomDate => {
    if (!yyyymmdd.match(/\d{4}\d{2}\d{2}/)) {
        throw new Error('This is not yyyymmdd')
    }

    return {
        year: Number(yyyymmdd.substring(0, 4)),
        month: Number(yyyymmdd.substring(4, 6)),
        day: Number(yyyymmdd.substring(6, 8)),
    }
}

export const fromHyphenYYYYMMDD = (hyphenYYYYMMDD: string): MyCustomDate => {
    // TODO: check format
    const split = hyphenYYYYMMDD.split('-')

    return { year: Number(split[0]), month: Number(split[1]), day: Number(split[2]) }

}

export const isSameDate = (date1: MyCustomDate, date2: MyCustomDate): boolean => {
    return toYYYYMMDD(date1) === toYYYYMMDD(date2)
}