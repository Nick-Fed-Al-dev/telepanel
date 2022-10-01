
export class LoginAccountDto {
    code : number

    constructor(object : any) {
        this.code = object.code
    }
}