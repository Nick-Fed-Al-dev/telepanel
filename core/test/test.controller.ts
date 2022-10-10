import * as express from "express"

import {RequestExtended} from "../../modules/types/RequestExtended"
import {ApiResponse} from "../../modules/ApiResponse"
import {TariffEntity} from "../tariff/tariff.entity"
import {ChargeEntity} from "../charge/charge.entity"

export class TestController {

    public static async charge(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {
            const userId = req.user.id

            const tariffEntity = await TariffEntity.findOneBy({userId})
            const chargeEntity = await ChargeEntity.findOneBy({tariffId: tariffEntity.id})

            const response = ApiResponse.ok("tested", chargeEntity)
            next(response)
        } catch (error : any) {
            next(error)
        }
    }

}