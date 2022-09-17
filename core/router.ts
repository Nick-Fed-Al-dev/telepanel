import * as express from "express"

import {userRouter} from "./user/user.router"
import {tariffRouter} from "./tariff/tariff.router"
import {chargeRouter} from "./charge/charge.router"

export const router = express.Router()

router.use("/user", userRouter)

router.use("/tariff", tariffRouter)

router.use("/charge", chargeRouter)