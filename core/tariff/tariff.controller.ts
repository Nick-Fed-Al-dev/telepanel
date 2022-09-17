import * as express from "express"

import {TariffService} from "./tariff.service"
import {ApiResponse} from "../../modules/ApiResponse"

export class TariffController {

    public static async getTariff(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {

            const userId = Number(req.params.userId)

            const entityTariffDto = await TariffService.getTariff(userId)

            const response = ApiResponse.ok("tariff received", entityTariffDto)

            next(response)

        } catch (error: any) {
            next(error)
        }
    }

    public static async updateTariff(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {

            const userId = Number(req.params.userId)
            const updateTariffDto = req.body

            const entityTariffDto = await TariffService.updateTariff(userId, updateTariffDto)

            const response = ApiResponse.created("tariff updated", entityTariffDto)

            next(response)

        } catch (error: any) {
            next(error)
        }
    }
}