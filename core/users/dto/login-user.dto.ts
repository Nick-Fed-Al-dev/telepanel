
// класс описывает обьект который требуется для входа пользователя
export class LoginUserDto {
    public email : string
    public password : string

    constructor(object : any) {
        this.email = object.email
        this.password = object.password
    }
}