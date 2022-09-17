import * as express from "express"

import {TariffValidator} from "./tariff.validator"
import {TariffController} from "./tariff.controller"

export const tariffRouter = express.Router()

tariffRouter.get("/:userId", TariffValidator.validateParamUserId(), TariffController.getTariff)

tariffRouter.patch("/update/:userId", TariffValidator.validateUpdate(), TariffController.updateTariff)