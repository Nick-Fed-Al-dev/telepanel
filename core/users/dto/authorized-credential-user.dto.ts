import {AuthorizedUserDto} from "./authorized-user.dto"

// класс описывает обьект авторизованного пользователя с refresh токеном
export class AuthorizedCredentialUserDto extends AuthorizedUserDto {
    public refreshToken : string

    constructor(object : any) {
        super(object)
        this.refreshToken = object.refreshToken
    }
}