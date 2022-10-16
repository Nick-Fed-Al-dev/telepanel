import * as express from "express"

import {authMiddleware} from "../../modules/middlewares/auth.middleware"
import {chargeMiddleware} from "../../modules/middlewares/charge.middleware"
import {accountMiddleware} from "../../modules/middlewares/account.middleware"
import {ClientValidator} from "./client.validator"
import {ClientController} from "./client.controller"

export const clientRouter = express.Router()

clientRouter.use(authMiddleware())
clientRouter.use(chargeMiddleware())
clientRouter.use(accountMiddleware())

clientRouter.get("/all/:clusterId", ClientValidator.validateClusterIdParam(), ClientController.findClients)

clientRouter.get("/:clientId", ClientValidator.validateClientIdParam(), ClientController.findClient)

clientRouter.patch("/refresh-all/:clusterId", ClientValidator.validateAccountId(), ClientController.refreshClients)

clientRouter.patch("/refresh/:clientId", ClientValidator.validateClientRefresh(), ClientController.refreshClient)

clientRouter.patch("/update/:clientId", ClientValidator.validateClientIdParam(), ClientController.updateClient)
