

export class EntityClientDto {

    public id : number
    public userId : number
    public createdAt : Date
    public username : string
    public bio : string
    public from : string
    public photo : any
    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.userId = object.userId
        this.createdAt = object.createdAt
        this.username = object.username
        this.bio = object.bio
        this.from = object.from
        this.photo = JSON.parse(object.photo)
        this.updatedAt = object.updatedAt
    }

}