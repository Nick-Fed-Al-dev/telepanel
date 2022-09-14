import * as express from "express"

import {ApiError} from "../ApiError"

// middleware нужен для уменьшения повторений кода
// он валидирует запрос и в случае чего выбрасывает ошибку
export const validationMiddleware = () => {

    return (req : express.Request, res : express.Response, next : express.NextFunction) => {
        try {
            ApiError.validateRequest(req)
        } catch (error : any) {
            next(error)
        }

    }
}