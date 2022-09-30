import * as express from "express"

import {AccountValidator} from "./account.validator"
import {AccountController} from "./account.controller"
import {authMiddleware} from "../../modules/middlewares/auth.middleware"
import {chargeMiddleware} from "../../modules/middlewares/charge.middleware"
import {accountMiddleware} from "../../modules/middlewares/account.middleware"

export const accountRouter = express.Router()

accountRouter.use(authMiddleware())
accountRouter.use(chargeMiddleware())

accountRouter.get("/", AccountController.getAccounts)

accountRouter.post("/create", AccountValidator.validatePhoneNumber(), AccountController.createAccount)

accountRouter.get("/test", accountMiddleware(), AccountController.test)