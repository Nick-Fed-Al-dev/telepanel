import * as express from "express"

import {TestController} from "./test.controller"
import {authMiddleware} from "../../modules/middlewares/auth.middleware"
import {chargeMiddleware} from "../../modules/middlewares/charge.middleware"

export const testRouter = express.Router()

testRouter.get("/charge", [
    authMiddleware(),
    chargeMiddleware()
], TestController.charge)