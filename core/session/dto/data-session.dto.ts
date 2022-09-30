
export class DataSessionDto {
    public key : BigInteger
    public bytes : Buffer

    constructor(object : any) {
        this.key = object.key
        this.bytes = object.bytes
    }
}