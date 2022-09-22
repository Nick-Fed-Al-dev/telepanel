import * as express from "express"

import {TariffService} from "./tariff.service"
import {ApiResponse} from "../../modules/ApiResponse"
import {RequestExtended} from "../../modules/types/RequestExtended"

export class TariffController {

    public static async getTariff(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {

            const userId = req.user.id

            const entityTariffDto = await TariffService.getTariff(userId)

            const response = ApiResponse.ok("tariff received", entityTariffDto)

            next(response)

        } catch (error: any) {
            next(error)
        }
    }

    public static async updateTariff(req : RequestExtended, res : express.Response, next : express.NextFunction) {
        try {

            const userId = req.user.id
            const updateTariffDto = req.body

            const entityTariffDto = await TariffService.updateTariff(userId, updateTariffDto)

            const response = ApiResponse.created("tariff updated", entityTariffDto)

            next(response)

        } catch (error: any) {
            next(error)
        }
    }
}