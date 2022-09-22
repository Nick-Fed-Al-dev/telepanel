import * as typeorm from "typeorm"

@typeorm.Entity("Charges")
export class ChargeEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public tariffId : number

    @typeorm.Column()
    public expiresIn : number

    @typeorm.CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    public updatedAt : Date

}