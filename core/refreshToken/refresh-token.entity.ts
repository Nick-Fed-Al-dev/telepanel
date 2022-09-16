import * as typeorm from "typeorm"

// описываем сущность refresh токена в базе
@typeorm.Entity({name: "refreshToken"})
export class RefreshTokenEntity extends typeorm.BaseEntity{

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public userId : number

    @typeorm.Column()
    public refreshToken : string

}