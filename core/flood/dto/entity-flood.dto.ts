
export class EntityFloodDto {

    public id : number
    public accountId : number
    public expiresIn : number
    public createdAt : Date
    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.accountId = object.accountId
        this.expiresIn = object.expiresIn
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
    }

}