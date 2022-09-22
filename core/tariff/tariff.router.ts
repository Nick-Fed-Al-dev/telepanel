import * as express from "express"

import {TariffValidator} from "./tariff.validator"
import {TariffController} from "./tariff.controller"
import {authMiddleware} from "../../modules/middlewares/auth.middleware"
import {chargeMiddleware} from "../../modules/middlewares/charge.middleware"

export const tariffRouter = express.Router()

tariffRouter.use(authMiddleware())
tariffRouter.use(chargeMiddleware())

tariffRouter.get("/", TariffController.getTariff)

tariffRouter.patch("/update", TariffValidator.validateChanges(), TariffController.updateTariff)