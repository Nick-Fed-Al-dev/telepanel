
export class CreateSessionDto {
    public accountId : number
    public sessionName : string

    constructor(object : any) {
        this.accountId = object.accountId
        this.sessionName = object.sessionName
    }
}