
// класс описывает обьект который будет шифроваться в jwt
export class PayloadUserDto {
    public id : number
    public email : string
    public createdAt : Date

    constructor(object : any) {
        this.id = object.id
        this.email = object.email
        this.createdAt = object.createdAt
    }

}