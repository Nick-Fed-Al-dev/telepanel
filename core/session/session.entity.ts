import * as typerom from "typeorm"

@typerom.Entity()
export class SessionEntity extends typerom.BaseEntity {

    @typerom.PrimaryGeneratedColumn()
    public id : number

    @typerom.Column()
    public accountId : number

    @typerom.Column()
    public key : number

    @typerom.Column()
    public bytes : Buffer

}
