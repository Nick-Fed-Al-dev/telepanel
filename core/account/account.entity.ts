import * as typeorm from "typeorm"

@typeorm.Entity("account")
export class AccountEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public userId : number

    @typeorm.Column()
    public phone : string

    @typeorm.Column({default: false})
    public isAuthorized : boolean

    @typeorm.CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public createdAt : Date

    @typeorm.CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    public updatedAt : Date
}
