import {TariffNames} from "../../../modules/types/TariffNames"
import {EntityTariffDto} from "./entity-tariff.dto"

export class UpdateTariffDto {

    public name : TariffNames
    public period : number

    constructor(object : any) {
        this.name = object.name
        this.period = object.period
    }

}
