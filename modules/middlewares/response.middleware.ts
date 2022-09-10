import * as express from "express"

import {ApiError} from "../ApiError"
import {logger} from "../logger"
import {HttpStatus} from "../HttpStatus"
import {ApiResponse} from "../ApiResponse"

// middleware нужен для организации ответов сервера
export const responseMiddleware = () => {
    // если передать в функцию next некоторый обьект,
    // то он будет в том или ином виде возвращен на клиент
    return (data : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
        // если обьект является ошибкой - выводим в логги
        if(data instanceof Error) {
            logger.error(data.message)

            // если ошибка была выброшена ApiError отправляем на клиент одним образом
            if(data instanceof ApiError) {
                return res.status(data.code).json(data)
            }
            // если ошибка нам не известна другим
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "internal server error",
                error: data
            })
        }
        // если обьект инстанс ApiResponse отправляем на клиент
        if(data instanceof ApiResponse) {
            return res.status(data.code).json(data)
        }
        // если обьект неизвестен - игнорим
        next()
    }
}