
export class CreateSessionDto {

    public key : number
    public bytes : Buffer

    constructor(object : any) {
        this.key = object.id
        this.bytes = object.bytes
    }

}