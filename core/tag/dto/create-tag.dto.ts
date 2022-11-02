
export class CreateTagDto {

    public userId : number
    public name : string
    public description : string

    constructor(object : any) {
        this.userId = object.userId
        this.name = object.name
        this.description = object.description
    }
}