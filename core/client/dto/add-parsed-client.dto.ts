
export class AddParsedClientDto {
    public usernames : string[]
    public groupId : string

    constructor(object : any) {
        this.usernames = object.usernames
        this.groupId = object.groupId
    }
}