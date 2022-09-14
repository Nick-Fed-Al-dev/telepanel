import * as express from "express"

import {UsersController} from "./users.conroller"
import {UsersValidator} from "./users.validator"

// создаем экземпляр роутера
export const usersRouter = express.Router()

// перечисляем роуты отвечающие за авторизацию
usersRouter.get("/activate/:code", UsersValidator.validateActivation(), UsersController.activate)

usersRouter.post("/register", UsersValidator.validateRegister(), UsersController.register)

usersRouter.post("/login", UsersValidator.validateLogin(), UsersController.login)

usersRouter.post("/refresh", UsersValidator.validateCookie(), UsersController.refresh)

usersRouter.post("/logout", UsersValidator.validateCookie(), UsersController.logout)
