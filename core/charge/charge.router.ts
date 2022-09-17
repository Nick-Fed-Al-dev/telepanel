import * as express from "express"

import {ChargeValidator} from "./charge.validator"
import {ChargeController} from "./charge.controller"

export const chargeRouter = express.Router()

chargeRouter.get("/:userId", ChargeValidator.validateParamUserId(), ChargeController.getCharge)

chargeRouter.get("/recharge/:userId", ChargeValidator.validateParamUserId(), ChargeController.recharge)