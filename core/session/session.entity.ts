import * as typeorm from "typeorm"

@typeorm.Entity("Sessions")
export class SessionEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public accountId : number

    @typeorm.Column()
    public sessionName : string

}
