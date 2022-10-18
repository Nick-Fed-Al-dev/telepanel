
export class AddGroupDto {

    public telegramId : string

    constructor(object : any) {
        this.telegramId = object.telegramId
    }

}