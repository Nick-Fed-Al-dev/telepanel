
export class EntityRefreshTokenDto {

    public id : number

    public userId : number

    public refreshToken : string

    constructor(object : any) {
        this.id = object.id
        this.userId = object.userId
        this.refreshToken = object.refreshToken
    }

}