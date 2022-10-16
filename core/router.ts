import * as express from "express"

import {userRouter} from "./user/user.router"
import {tariffRouter} from "./tariff/tariff.router"
import {chargeRouter} from "./charge/charge.router"
import {accountRouter} from "./account/account.router"
import {testRouter} from "./test/test.router"
import {clusterRouter} from "./cluster/cluster.router"
import {clientRouter} from "./client/client.router"

export const router = express.Router()

router.use("/user", userRouter)

router.use("/tariff", tariffRouter)

router.use("/charge", chargeRouter)

router.use("/account", accountRouter)

router.use("/cluster", clusterRouter)

router.use("/client", clientRouter)

router.use("/test", testRouter)