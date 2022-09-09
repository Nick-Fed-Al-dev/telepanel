import {AuthorizedUserDto} from "./authorized-user.dto"

export class AuthorizedCredentialUserDto extends AuthorizedUserDto {
    public refreshToken : string

    constructor(object : any) {
        super(object)
        this.refreshToken = object.refreshToken
    }
}