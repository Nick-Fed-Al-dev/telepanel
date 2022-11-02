import {EntityAccountDataDto} from "../../account-data/dto/entity-account-data.dto"
import {EntityFloodDto} from "../../flood/dto/entity-flood.dto"

export class FullAccountDto {

    public id : number
    public userId : number
    public phone : string
    public isAuthorized : boolean
    public createdAt : Date
    public updatedAt : Date
    public data : EntityAccountDataDto
    public flood : EntityFloodDto

    constructor(object : any) {
        this.id = object.id
        this.userId = object.userId
        this.phone = object.phone
        this.isAuthorized = object.isAuthorized
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
        this.data = object.data
        this.flood = object.flood
    }
}