import * as express from "express"

import {usersRouter} from "./users/users.router"

export const router = express.Router()

router.use("/users", usersRouter)