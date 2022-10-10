import * as typeorm from "typeorm"

@typeorm.Entity("Clients")
export class ClientEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public userId : number

    @typeorm.Column()
    public username : string

    @typeorm.Column({nullable: true})
    public bio : string

    @typeorm.Column({nullable: true})
    public photo : string

    @typeorm.Column({nullable: true})
    public from : string

    @typeorm.CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public createdAt : Date

    @typeorm.CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    public updatedAt : Date

}