import * as typeorm from "typeorm"

// описываем сущность пользователя в базе
@typeorm.Entity({name: "users"})
export class UsersEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public email : string

    @typeorm.Column()
    public password : string

    @typeorm.Column({default: false})
    public isActivated : boolean

    @typeorm.Column()
    public activationCode : string

    @typeorm.CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public createdAt : Date

}