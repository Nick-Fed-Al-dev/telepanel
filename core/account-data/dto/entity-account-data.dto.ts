
export class EntityAccountDataDto {

    public id : number
    public accountId : number
    public username : string
    public firstName : string
    public lastName : string
    public bio : string
    public photo : any
    public createdAt : Date
    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.accountId = object.accountId
        this.username = object.username
        this.firstName = object.firstName
        this.lastName = object.lastName
        this.bio = object.bio
        this.photo = object.photo
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
    }
}