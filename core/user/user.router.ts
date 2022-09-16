import * as express from "express"

import {UserController} from "./user.conroller"
import {UserValidator} from "./user.validator"

// создаем экземпляр роутера
export const userRouter = express.Router()

// перечисляем роуты отвечающие за авторизацию
userRouter.get("/activate/:code", UserValidator.validateActivation(), UserController.activate)

userRouter.post("/register", UserValidator.validateRegister(), UserController.register)

userRouter.post("/login", UserValidator.validateLogin(), UserController.login)

userRouter.post("/refresh", UserValidator.validateCookie(), UserController.refresh)

userRouter.post("/logout", UserValidator.validateCookie(), UserController.logout)
