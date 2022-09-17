import {PayloadUserDto} from "./payload-user.dto"

export class AuthorizedUserDto extends PayloadUserDto {
    public accessToken : string

    constructor(object : any) {
        super(object)
        this.accessToken = object.accessToken
    }
}