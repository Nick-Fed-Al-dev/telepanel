import * as typeorm from "typeorm"

@typeorm.Entity({name: "users"})
export class UsersEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public email : string

    @typeorm.Column()
    public password : string

    @typeorm.CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public createdAt : Date

}