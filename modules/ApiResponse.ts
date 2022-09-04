
export class ApiResponse {
    public message : string
    public code : number
    public data : any

    constructor(message : string, code : number, data : any) {
        this.message = message
        this.code = code
        this.data = data
    }
}