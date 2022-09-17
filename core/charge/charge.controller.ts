import * as express from "express"

import {ChargeService} from "./charge.service"
import {ApiResponse} from "../../modules/ApiResponse"

export class ChargeController {

    public static async getCharge(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            const userId = Number(req.params.userId)

            const entityChargeDto = await ChargeService.getCharge(userId)

            const response = ApiResponse.ok("charge received", entityChargeDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async recharge(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            const userId = Number(req.params.userId)

            const entityChargeDto = await ChargeService.recharge(userId)

            const response = ApiResponse.ok("recharged", entityChargeDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

}