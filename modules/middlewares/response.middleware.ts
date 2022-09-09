import * as express from "express"

import {ApiError} from "../ApiError"
import {logger} from "../logger"
import {HttpStatus} from "../HttpStatus"
import {ApiResponse} from "../ApiResponse"

export const responseMiddleware = () => {

    return (data : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
        if(data instanceof Error) {
            logger.error(data.message)

            if(data instanceof ApiError) {
                return res.status(data.code).json(data)
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "internal server error",
                error: data
            })
        }

        if(data instanceof ApiResponse) {
            return res.status(data.code).json(data)
        }
    }
}