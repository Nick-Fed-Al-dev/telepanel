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

clientRouter.get("/", ClientController.getClients)

clientRouter.get("/:clientId", ClientValidator.validateClientIdParam(), ClientController.getClient)

clientRouter.post("/add", ClientValidator.validateUsername(), ClientController.addClient)

clientRouter.post("/add-parsed", ClientValidator.validateParsedAddition(), ClientController.addParsedClients)

clientRouter.patch("/refresh", ClientController.refreshClients)

clientRouter.patch("/refresh/:clientId", ClientValidator.validateClientIdParam(), ClientController.refreshClient)

clientRouter.delete("/:clientId", ClientValidator.validateClientIdParam(), ClientController.removeClient)