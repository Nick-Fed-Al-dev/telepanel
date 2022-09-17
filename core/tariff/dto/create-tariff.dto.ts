import {TariffNames} from "../types/TariffNames"

export class CreateTariffDto {

    public userId : number
    public name : TariffNames
    public period : number

    constructor(object : any) {
        this.userId = object.userId
        this.name = object.name
        this.period = object.period
    }
}