import * as express from "express"

import {userRouter} from "./user/user.router"
import {tariffRouter} from "./tariff/tariff.router"
import {chargeRouter} from "./charge/charge.router"
import {accountRouter} from "./account/account.router"
import {testRouter} from "./test/test.router"
import {tagRouter} from "./tag/tag.router"

export const router = express.Router()

router.use("/user", userRouter)

router.use("/tariff", tariffRouter)

router.use("/charge", chargeRouter)

router.use("/account", accountRouter)

router.use("/tag", tagRouter)

router.use("/test", testRouter)