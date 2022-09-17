import * as express from "express"

import {userRouter} from "./user/user.router"

export const router = express.Router()

router.use("/user", userRouter)