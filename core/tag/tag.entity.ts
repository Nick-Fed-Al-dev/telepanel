import * as typeorm from "typeorm"

@typeorm.Entity("tag")
export class TagEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public userId : number

    @typeorm.Column()
    public name : string

    @typeorm.Column()
    public description : string

}
