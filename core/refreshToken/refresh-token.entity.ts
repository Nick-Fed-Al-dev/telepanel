import * as typeorm from "typeorm"

@typeorm.Entity("Refresh_Tokens")
export class RefreshTokenEntity extends typeorm.BaseEntity{

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public userId : number

    @typeorm.Column()
    public refreshToken : string

}