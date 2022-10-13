
export class EntityClusterDto {

    public id : number
    public userId : number
    public title : string
    public createdAt : Date
    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.userId = object.userId
        this.title = object.title
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
    }

}