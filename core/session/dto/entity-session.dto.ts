
export class EntitySessionDto {

    public id : number
    public accountId : number
    public key : number
    public bytes : Buffer

    constructor(object : any) {
        this.id = object.id
        this.accountId = object.accountId
        this.key = object.key
        this.bytes = Buffer.from(object.bytes)
    }
}