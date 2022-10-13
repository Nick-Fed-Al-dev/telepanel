
export class CreateClusterDto {

    public userId : number
    public title : string

    constructor(object : any) {
        this.userId = object.userId
        this.title = object.title
    }
}