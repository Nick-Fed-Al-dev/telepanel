import * as express from "express"

import {authMiddleware} from "../../modules/middlewares/auth.middleware"
import {chargeMiddleware} from "../../modules/middlewares/charge.middleware"
import {floodMiddleware} from "../../modules/middlewares/flood.middleware"
import {TagValidator} from "./tag.validator"
import {TagController} from "./tag.controller"

export const tagRouter = express.Router()

tagRouter.use(authMiddleware())
tagRouter.use(chargeMiddleware())
tagRouter.use(floodMiddleware())

tagRouter.get("/", TagController.getTags)

tagRouter.get("/:tagId", TagValidator.validateTagIdParam(), TagController.getTag)

tagRouter.post("/", TagValidator.validateTagAddition(), TagController.createTag)

tagRouter.patch("/:tagId", TagValidator.validateTagIdParam(), TagController.updateTag)

tagRouter.delete("/:tagId", TagValidator.validateTagIdParam(), TagController.removeTag)