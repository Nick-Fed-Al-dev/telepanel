

export class Time {

    static convertDaysToMs(days : number | string) {
        return Number(days) * 24 * 60 * 60 * 1000
    }

}