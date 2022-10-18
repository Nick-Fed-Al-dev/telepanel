
export class EntityGroupDto {

    public id : number
    public clusterId : number
    public telegramId : string
    public title : string
    public description : string
    public population : number
    public createdAt : Date
    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.clusterId = object.clusterId
        this.telegramId = object.telegramId
        this.title = object.title
        this.description = object.description
        this.population = object.population
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
    }

}