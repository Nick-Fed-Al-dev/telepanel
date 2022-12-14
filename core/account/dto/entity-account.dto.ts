
export class EntityAccountDto {

    public id : number
    public userId : number
    public phone : string
    public isAuthorized : boolean
    public createdAt : Date
    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.userId = object.userId
        this.phone = object.phone
        this.isAuthorized = object.isAuthorized
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
    }

}