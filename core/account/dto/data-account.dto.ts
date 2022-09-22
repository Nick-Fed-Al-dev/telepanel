
export class DataAccountDto {

    public phone : string
    public username : string
    public firstname : string
    public secondname : string
    public photo : string
    public bio : string

    constructor(object : any) {
        this.phone = object.phone
        this.username = object.username
        this.firstname = object.firstname
        this.secondname = object.secondname
        this.phone = object.photo
        this.bio = object.bio
    }
}