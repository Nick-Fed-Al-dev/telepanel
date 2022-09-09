import * as express from "express"

import {UsersController} from "./users.conroller"
import {UsersValidator} from "./users.validator"

export const usersRouter = express.Router()

usersRouter.post("/register", UsersValidator.validateRegister(), UsersController.register)

usersRouter.post("/login", UsersValidator.validateLogin(), UsersController.login)

usersRouter.post("/refresh", UsersValidator.validateCookie(), UsersController.refresh)

usersRouter.post("/logout", UsersValidator.validateCookie(), UsersController.logout)
