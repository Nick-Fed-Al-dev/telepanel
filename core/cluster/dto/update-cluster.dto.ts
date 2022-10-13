
export class UpdateClusterDto {

    public title : string

    constructor(object : any) {
        this.title = object.title
    }

}