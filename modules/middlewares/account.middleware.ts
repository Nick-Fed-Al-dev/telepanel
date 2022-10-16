import * as express from "express"

import {RequestExtended} from "../types/RequestExtended"
import {ApiTelegramClient} from "../ApiTelegramClient"
import {SessionService} from "../../core/session/session.service"
import {ApiError} from "../ApiError"

export const accountMiddleware = () => {

    return async (req : RequestExtended, res : express.Response, next : express.NextFunction) => {
        try {

            const {accountId}  = req.body

            if(!accountId) {
                next()
            }

            const entitySessionDto = await SessionService.getSession(accountId)

            const telegramClient = await ApiTelegramClient.login(entitySessionDto.sessionName)

            req.telegramClient = telegramClient

            next()

        } catch (error : any) {
            next(error)
        }
    }
}