
export class EntitySessionDto {

    public id : number
    public accountId : number
    public sessionName : string

    constructor(object : any) {
        this.id = object.id
        this.accountId = object.accountId
        this.sessionName = object.sessionName
    }
}