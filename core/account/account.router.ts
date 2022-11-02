import * as express from "express"

import {AccountValidator} from "./account.validator"
import {AccountController} from "./account.controller"
import {authMiddleware} from "../../modules/middlewares/auth.middleware"
import {chargeMiddleware} from "../../modules/middlewares/charge.middleware"
import {floodMiddleware} from "../../modules/middlewares/flood.middleware"

export const accountRouter = express.Router()

accountRouter.use(authMiddleware())
accountRouter.use(chargeMiddleware())
accountRouter.use(floodMiddleware())

accountRouter.get("/", AccountController.getAccounts)

accountRouter.get("/:accountId", AccountValidator.validateParamAccountId(), AccountController.getAccount)

accountRouter.post("/create", AccountValidator.validatePhoneNumber(), AccountController.createAccount)

accountRouter.post("/code/:accountId", AccountValidator.validateParamAccountId(), AccountController.sendCode)

accountRouter.post("/login/:accountId", AccountValidator.validateAccountLogin(), AccountController.loginAccount)

accountRouter.patch("/refresh/:accountId", AccountValidator.validateParamAccountId(), AccountController.refreshAccount)
