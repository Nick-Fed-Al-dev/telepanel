
export class DataSessionDto {
    public sessionName : string

    constructor(object : any) {
        this.sessionName = object.sessionName
    }
}