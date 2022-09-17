import * as express from "express"

import {PayloadUserDto} from "../../core/user/dto/payload-user.dto"
import {ChargeService} from "../../core/charge/charge.service"
import {ApiError} from "../ApiError"

export const chargeMiddleware = () => {

    return async (req : express.Request, res : express.Response & any, next : express.NextFunction) => {
        try {

            const payloadUserDto = new PayloadUserDto(res.user)
            const entityChargeDto = await ChargeService.updateCharge(payloadUserDto.id)

            if(!entityChargeDto.expiresIn) {
                ApiError.noAccess("your charge expired")
            }

            next()

        } catch (error : any) {
            next(error)
        }
    }
}