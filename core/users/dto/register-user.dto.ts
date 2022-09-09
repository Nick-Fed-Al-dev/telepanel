
export class RegisterUserDto {
    public email : string
    public password : string
    public createdAt : Date
    public updatedAt : Date

    constructor(object : any) {
        this.email = object.email
        this.password = object.password
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}