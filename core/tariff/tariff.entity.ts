import * as typeorm from "typeorm"

import {TariffNames} from "./types/TariffNames"

@typeorm.Entity({name: "tariff"})
export class TariffEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public userId : number

    @typeorm.Column({default: TariffNames.NATIVE})
    public name : TariffNames

    @typeorm.Column()
    public period : number

    @typeorm.Column({default: false})
    public autoRecharge : boolean

    @typeorm.CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    public updatedAt : Date

}