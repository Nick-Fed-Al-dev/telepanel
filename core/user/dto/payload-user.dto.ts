
export class PayloadUserDto {
    public id : number
    public email : string
    public isActivated : boolean
    public createdAt : Date

    constructor(object : any) {
        this.id = object.id
        this.email = object.email
        this.isActivated = object.isActivated
        this.createdAt = object.createdAt
    }

}