import {PayloadUserDto} from "./payload-user.dto"

export class AuthorizedUserDto extends PayloadUserDto {
    public assessToken : string

    constructor(object : any) {
        super(object)
        this.assessToken = object.accessToken
    }
}