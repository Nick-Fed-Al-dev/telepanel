
export class EntityClientDto {

    public id : number
    public clusterId : number
    public username : string
    public bio : string
    public groups : string[]
    public isRefused : boolean
    public createdAt : Date
    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.clusterId = object.clusterId
        this.username = object.username
        this.bio = object.bio
        this.groups = object.groups
        this.isRefused = object.isRefused
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
    }

}