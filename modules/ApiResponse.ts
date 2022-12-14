import {HttpStatus} from "./HttpStatus"

// TODO: реализовать сценарий отправки файлов
export class ApiResponse {
    public message : string
    public code : number
    public info? : any

    constructor(message : string, code : number, data? : any) {
        this.message = message
        this.code = code
        this.info = data
    }

    public static ok(message = "ok", data? : any) {
        return new ApiResponse(message, HttpStatus.OK, data)
    }

    public static created(message = "created", data? : any) {
        return new ApiResponse(message, HttpStatus.CREATED, data)
    }
}