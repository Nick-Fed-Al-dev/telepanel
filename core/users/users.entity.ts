import * as typeorm from "typeorm"

@typeorm.Entity()
export class UsersEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public email : string

    @typeorm.Column()
    public password : string

    @typeorm.Column()
    public createdAt : Date

    @typeorm.Column()
    public updatedAt : Date

}