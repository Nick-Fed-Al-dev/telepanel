
export class CreateAccountDto {

    public phone : string

    constructor(object : any) {
        this.phone = object.phone
    }

}