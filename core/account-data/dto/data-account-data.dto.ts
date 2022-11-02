
export class DataAccountDataDto {

    public username : string
    public firstName : string
    public lastName : string
    public bio : string
    public photo : any

    constructor(object : any) {
        this.username = object.username
        this.firstName = object.firstName
        this.lastName = object.lastName
        this.bio = object.bio
        this.photo = object.photo
    }

}