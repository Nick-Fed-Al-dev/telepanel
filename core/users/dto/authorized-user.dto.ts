import {PayloadUserDto} from "./payload-user.dto"

// класс описывает обьект авторизованного пользователя
// предполагается, что обьекты данного класса будут отправлятся на клиент
export class AuthorizedUserDto extends PayloadUserDto {
    public accessToken : string

    constructor(object : any) {
        super(object)
        this.accessToken = object.accessToken
    }
}