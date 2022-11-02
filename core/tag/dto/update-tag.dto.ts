
export class UpdateTagDto {

    name : string
    description : string

    constructor(object : any) {
        this.name = object.name
        this.description = object.description
    }

}