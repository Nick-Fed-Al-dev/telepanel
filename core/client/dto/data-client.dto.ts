
export class DataClientDto {

    public username : string
    public bio : string
    public from : string
    public photo : string

    constructor(object : any) {
        this.username = object.username
        this.bio = object.bio
        this.from = object.from
        this.photo = JSON.stringify(object.photo)
    }
}