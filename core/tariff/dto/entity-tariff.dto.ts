import {TariffNames} from "../../../modules/types/TariffNames"

export class EntityTariffDto {
    public id : number
    public userId : number
    public name : TariffNames
    public period : number
    public autoRecharge : boolean

    constructor(object : any) {
        this.id = object.id
        this.userId = object.userId
        this.name = object.name
        this.period = object.period
        this.autoRecharge = object.autoRecharge
    }
}