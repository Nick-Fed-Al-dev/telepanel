import * as express from "express"

import {userRouter} from "./user/user.router"

// создаем главный роут
export const router = express.Router()

// перечисляем точки входа
router.use("/user", userRouter)