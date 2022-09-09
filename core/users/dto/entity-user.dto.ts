
export class EntityUserDto {

    public id : number

    public email : string

    public password : string

    public createdAt : Date

    public updatedAt : Date

    constructor(object : any) {
        this.id = object.id
        this.email = object.email
        this.password = object.password
        this.createdAt = object.createdAt
        this.updatedAt = object.updatedAt
    }

}