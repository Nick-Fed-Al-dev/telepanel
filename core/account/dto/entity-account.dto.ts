import {DataAccountDto} from "./data-account.dto"

export class EntityAccountDto extends DataAccountDto {

    public id : number
    public userId : number
    public createdAt : Date
    public updatedAt : Date

    constructor(object : any) {
        super(object)

        this.id = object.id
        this.userId = object.userId
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
    }

}