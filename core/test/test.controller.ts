import * as express from "express"

import {RequestExtended} from "../../modules/types/RequestExtended"
import {ApiResponse} from "../../modules/ApiResponse"

export class TestController {

    public static charge(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const response = ApiResponse.ok("tested")
            next(response)
        } catch (error : any) {
            next(error)
        }
    }

}