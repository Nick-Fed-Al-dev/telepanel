import * as express from "express"

import {RequestExtended} from "../types/RequestExtended"
import {AccountService} from "../../core/account/account.service"
import {ApiError} from "../ApiError"

export const accountAuthMiddleware = () => {

    return async (req : RequestExtended, res : express.Response, next : express.NextFunction) => {
        try {
            const accountId = Number(req.body.accountId)

            const entityAccountDto = await AccountService.getAccount(accountId)

            if(!entityAccountDto.isAuthorized) {
                ApiError.noAccess("account is not authorized")
            }

            next()
        } catch (error : any) {
            next(error)
        }
    }
}