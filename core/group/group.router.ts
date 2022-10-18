import * as express from "express"

import {authMiddleware} from "../../modules/middlewares/auth.middleware"
import {chargeMiddleware} from "../../modules/middlewares/charge.middleware"
import {accountMiddleware} from "../../modules/middlewares/account.middleware"
import {GroupValidator} from "./group.validator"
import {GroupController} from "./group.controller"

export const groupRouter = express.Router()

groupRouter.use(authMiddleware())
groupRouter.use(chargeMiddleware())
groupRouter.use(accountMiddleware())

groupRouter.get("/:groupId", GroupValidator.validateGroupIdParam(), GroupController.getGroup)

groupRouter.get("/all/:clusterId", GroupValidator.validateClusterIdParam(), GroupController.getGroups)

groupRouter.patch("/refresh/:groupId", GroupValidator.validateGroupRefresh(), GroupController.refreshGroup)

groupRouter.patch("/refresh/all/:clusterId", GroupValidator.validateGroupRefreshAll(), GroupController.refreshGroups)

groupRouter.post("/add/:clusterId", GroupValidator.validateGroupAddition(), GroupController.addGroup)

groupRouter.post("/search", GroupValidator.validateGroupSearch(), GroupController.searchGroups)

groupRouter.post("/parse/:groupId", GroupValidator.validateGroupParse(), GroupController.parseGroup)

groupRouter.delete("/:groupId", GroupValidator.validateGroupIdParam(), GroupController.removeGroup)