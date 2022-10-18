import * as typeorm from "typeorm"

@typeorm.Entity()
export class ClientEntity extends typeorm.BaseEntity {

    @typeorm.PrimaryGeneratedColumn()
    public id : number

    @typeorm.Column()
    public clusterId : number

    @typeorm.Column()
    public username : string

    @typeorm.Column({nullable: true})
    public bio : string

    @typeorm.Column({type: "array"})
    public groups : number[]

    @typeorm.Column({default: false})
    public isRefused : boolean

    @typeorm.CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public createdAt : Date

    @typeorm.CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updatedAt : Date
}