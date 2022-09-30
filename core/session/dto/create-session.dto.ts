
export class CreateSessionDto {
    public accountId : number
    public key : number
    public bytes : string

    constructor(object : any) {
        this.key = object.key
        this.bytes = JSON.stringify(object.bytes)
    }
}