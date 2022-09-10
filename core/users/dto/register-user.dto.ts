
// класс описывает обьект который требуется для регистрации пользователя
export class RegisterUserDto {
    public email : string
    public password : string

    constructor(object : any) {
        this.email = object.email
        this.password = object.password
    }
}