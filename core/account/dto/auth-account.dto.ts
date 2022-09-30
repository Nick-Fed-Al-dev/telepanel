import {TelegramClient} from "telegram"

export class AuthAccountDto {

    public client : TelegramClient
    public phone : string
    public codeHash : string
    public code : number

    constructor(object : any) {
        this.client = object.client
        this.phone = object.phone
        this.codeHash = object.codeHash
        this.code = object.code
    }

}