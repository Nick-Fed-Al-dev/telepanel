import * as express from "express"

import {config} from "../../modules/config/config"
import {Time} from "../../modules/Time"
import {ApiError} from "../../modules/ApiError"
import {RegisterUserDto} from "./dto/register-user.dto"
import {UsersService} from "./users.service"
import {AuthorizedUserDto} from "./dto/authorized-user.dto"
import {ApiResponse} from "../../modules/ApiResponse"
import {LoginUserDto} from "./dto/login-user.dto"

// класс предостовляет методы для обработки запросов на /api/users
// методы класса работают с http и взаимодействуют с users service
export class UsersController {

    static refreshTokenCookieName = "refreshToken"

    // приватный метод устанавливает refresh токен в cookie
    private static pushRefreshTokenCookie(res : express.Response, refreshToken : string) {
        res.cookie(
            UsersController.refreshTokenCookieName,
            refreshToken,
            {
                maxAge: Time.convertDaysToMs(config.REFRESH_TOKEN_DURATION_DAYS),
                httpOnly: true
            }
        )
    }

    // метод отвечает за обработку запросов на /api/users/register
    public static async register(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            // проверяем запрос на нужные нам данные
            ApiError.validateRequest(req)

            // получаем обьект регистрации из тела запроса
            const registerUserDto : RegisterUserDto = req.body

            // получаем обьект с данными пользователя и токенами
            const authorizedCredentialUserDto = await UsersService.register(registerUserDto)

            // убираем refresh токен из обьекта ради безопасности
            const authorizedUserDto = new AuthorizedUserDto(authorizedCredentialUserDto)

            // устанавливаем refresh токен cookie
            UsersController.pushRefreshTokenCookie(res, authorizedCredentialUserDto.refreshToken)

            // формируем ответ сервера
            const response = ApiResponse.created("user registered", authorizedUserDto)

            // отправляем ответ
            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    // метод отвечает за обработку запросов на /api/users/login
    public static async login(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            // проверяем запрос на нужные нам данные
            ApiError.validateRequest(req)

            // получяем обьект входа из тела запроса
            const loginUserDto : LoginUserDto = req.body

            // получаем авторизованого пользователя
            const authorizedCredentialUserDto = await UsersService.login(loginUserDto)

            // убираем refresh токен ради безопасности
            const authorizedUserDto = new AuthorizedUserDto(authorizedCredentialUserDto)

            // устанавливаем refresh токен в cookie
            UsersController.pushRefreshTokenCookie(res, authorizedCredentialUserDto.refreshToken)

            // формируем ответ сервера
            const response = ApiResponse.created("user logged in", authorizedUserDto)

            // отправляем ответ
            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    // метод отвечает за обработку запросов на /api/users/refresh
    public static async refresh(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            // проверяем запрос на нужные нам данные
            ApiError.validateRequest(req)

            // получаем refresh токен из cookie
            const {refreshToken} = req.cookies

            // получаем авторизованного пользователя
            const authorizedCredentialUserDto = await UsersService.refresh(refreshToken)

            // убираем refresh токен ради безопасности
            const authorizedUserDto = new AuthorizedUserDto(authorizedCredentialUserDto)

            // устанавливаем refresh токен в cookie
            UsersController.pushRefreshTokenCookie(res, refreshToken)

            // формируем ответ сервера
            const response = ApiResponse.created("authorization updated", authorizedUserDto)

            // отправляем ответ
            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    // метод отвечает за обработку запросов на /api/users/logout
    public static async logout(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            // проверяем запрос на нужные нам данные
            ApiError.validateRequest(req)

            // получаем refresh токен из cookie
            const {refreshToken} = req.cookies

            // удаляем токен в базе
            await UsersService.logout(refreshToken)

            // убираем refresh токен из cookie
            res.clearCookie(UsersController.refreshTokenCookieName)

            // формируем ответ сервера
            const response = ApiResponse.created("user logged out")

            // отправляем ответ
            next(response)

        } catch (error : any) {
            next(error)
        }
    }
}