import * as typeorm from "typeorm"

@typeorm.Entity()
export class GroupEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public clusterId : number

    @typeorm.Column()
    public telegramId : string

    @typeorm.Column()
    public title : string

    @typeorm.Column()
    public description : string

    @typeorm.Column()
    public population : number

    @typeorm.CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public createdAt : Date

    @typeorm.CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updatedAt : Date

}