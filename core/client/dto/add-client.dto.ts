
export class AddClientDto {
    public username : string

    constructor(object : any) {
        this.username = object.username
    }
}