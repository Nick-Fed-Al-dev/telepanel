
export class DataClientDto {

    public username : string
    public bio : string
    public groups : number[]

    constructor(object : any) {
        this.username = object.username
        this.bio = object.bio
        this.groups = object.groups
    }

}