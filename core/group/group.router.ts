import * as express from "express"

import {authMiddleware} from "../../modules/middlewares/auth.middleware"
import {chargeMiddleware} from "../../modules/middlewares/charge.middleware"
import {accountMiddleware} from "../../modules/middlewares/account.middleware"

const groupRouter = express.Router()

groupRouter.use(authMiddleware())
groupRouter.use(chargeMiddleware())
groupRouter.use(accountMiddleware())