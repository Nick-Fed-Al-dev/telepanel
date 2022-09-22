import * as express from "express"

import {ChargeService} from "./charge.service"
import {ApiResponse} from "../../modules/ApiResponse"
import {RequestExtended} from "../../modules/types/RequestExtended"

export class ChargeController {

    public static async getCharge(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const userId = req.user.id

            const entityChargeDto = await ChargeService.getCharge(userId)

            const response = ApiResponse.ok("charge received", entityChargeDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async recharge(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const userId = req.user.id

            const entityChargeDto = await ChargeService.recharge(userId)

            const response = ApiResponse.ok("recharged", entityChargeDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

}