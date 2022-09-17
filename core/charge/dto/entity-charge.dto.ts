
export class EntityChargeDto {

    public id : number
    public tariffId : number
    public expiresIn : number
    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.tariffId = object.tariffId
        this.expiresIn = object.expiresIn
        this.updatedAt = object.updatedAt
    }
}