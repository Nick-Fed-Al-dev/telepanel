
export class DataAccountDto {

    public phone : string
    public username : string
    public firstName : string
    public lastName : string
    public bio : string

    constructor(object : any) {
        this.phone = object.phone
        this.username = object.username
        this.firstName = object.firstName
        this.lastName = object.lastName
        this.bio = object.bio
    }
}