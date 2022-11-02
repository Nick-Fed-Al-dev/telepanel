
export class EntityTagDto {

    public id : number
    public userId : number
    public name : string
    public description : string
    public createdAt : Date
    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.userId = object.userId
        this.name = object.name
        this.description = object.description
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
    }
}