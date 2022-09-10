import * as express from "express"

import {usersRouter} from "./users/users.router"

// создаем главный роут
export const router = express.Router()

// перечисляем точки входа
router.use("/users", usersRouter)