

export class Time {

    static convertDaysToMs(days : number | string) : number {
        return Number(days) * 24 * 60 * 60 * 1000
    }

    static datesDifferenceInDays(date1 : Date, date2 : Date) : number {
        const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
        const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())

        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24))
    }

}