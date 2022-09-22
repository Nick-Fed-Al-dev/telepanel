import * as express from "express"

import {ChargeController} from "./charge.controller"
import {authMiddleware} from "../../modules/middlewares/auth.middleware"

export const chargeRouter = express.Router()

chargeRouter.use(authMiddleware())

chargeRouter.get("/", ChargeController.getCharge)

chargeRouter.get("/recharge", ChargeController.recharge)