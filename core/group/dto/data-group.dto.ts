
export class DataGroupDto {

    public telegramId : string
    public title : string
    public description : string
    public population : number

    constructor(object : any) {
        this.telegramId = object.telegramId
        this.title = object.title
        this.description = object.description
        this.population = object.population
    }

}