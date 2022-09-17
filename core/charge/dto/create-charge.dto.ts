
export class CreateChargeDto {

    public tariffId : number
    public expiresIn : number

    constructor(object : any) {
        this.tariffId = object.tariffId
        this.expiresIn = object.expiresIn
    }

}