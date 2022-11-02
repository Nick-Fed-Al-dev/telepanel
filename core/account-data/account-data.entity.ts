import * as typeorm from "typeorm"

@typeorm.Entity("account-data")
export class AccountDataEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public accountId : number

    @typeorm.Column({nullable: true})
    public username : string

    @typeorm.Column({nullable: true})
    public firstName : string

    @typeorm.Column({nullable: true})
    public lastName : string

    @typeorm.Column({nullable: true})
    public bio : string

    @typeorm.CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public createdAt : Date

    @typeorm.CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    public updatedAt : Date

}