
export class BindAccountDto {

    public phone : string
    public code : number

    constructor(object : any) {
        this.phone = object.phone
        this.code = object.code
    }

}