import * as express from "express"

import {ChargeService} from "../../core/charge/charge.service"
import {ApiError} from "../ApiError"
import {RequestExtended} from "../types/RequestExtended"

export const chargeMiddleware = () => {

    return async (req : RequestExtended, res : express.Response, next : express.NextFunction) => {
        try {
            const entityChargeDto = await ChargeService.updateCharge(req.user.id)

            if(!entityChargeDto.expiresIn) {
                ApiError.noAccess("your charge expired")
            }

            next()

        } catch (error : any) {
            next(error)
        }
    }
}