
export class PayloadUserDto {

    public id : number

    public email : string

    public createdAt : Date

    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.email = object.email
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
    }

}