import * as express from "express"

import {config} from "../../modules/config/config"
import {Time} from "../../modules/Time"
import {RegisterUserDto} from "./dto/register-user.dto"
import {UserService} from "./user.service"
import {AuthorizedUserDto} from "./dto/authorized-user.dto"
import {ApiResponse} from "../../modules/ApiResponse"
import {LoginUserDto} from "./dto/login-user.dto"
import {ApiError} from "../../modules/ApiError"

export class UserController {

    static refreshTokenCookieName = "refreshToken"

    private static pushRefreshTokenCookie(res : express.Response, refreshToken : string) {
        res.cookie(
            UserController.refreshTokenCookieName,
            refreshToken,
            {
                maxAge: Time.convertDaysToMs(config.REFRESH_TOKEN_DURATION_DAYS),
                httpOnly: true
            }
        )
    }

    public static async activate(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const activationCode = req.params.code

            const authorizedCredentialUserDto = await UserService.activate(activationCode)

            const authorizedUserDto = new AuthorizedUserDto(authorizedCredentialUserDto)

            const response = ApiResponse.created("user activated", authorizedUserDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async register(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const registerUserDto = new RegisterUserDto(req.body)

            const authorizedCredentialUserDto = await UserService.register(registerUserDto)

            const authorizedUserDto = new AuthorizedUserDto(authorizedCredentialUserDto)

            UserController.pushRefreshTokenCookie(res, authorizedCredentialUserDto.refreshToken)

            const response = ApiResponse.created("user registered", authorizedUserDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async login(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const loginUserDto : LoginUserDto = req.body

            const authorizedCredentialUserDto = await UserService.login(loginUserDto)

            const authorizedUserDto = new AuthorizedUserDto(authorizedCredentialUserDto)

            UserController.pushRefreshTokenCookie(res, authorizedCredentialUserDto.refreshToken)

            const response = ApiResponse.created("user logged in", authorizedUserDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async refresh(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {
            ApiError.validateRequest(req)

            const {refreshToken} = req.cookies

            const authorizedCredentialUserDto = await UserService.refresh(refreshToken)

            const authorizedUserDto = new AuthorizedUserDto(authorizedCredentialUserDto)

            UserController.pushRefreshTokenCookie(res, refreshToken)

            const response = ApiResponse.created("authorization updated", authorizedUserDto)

            next(response)

        } catch (error : any) {
            next(error)
        }
    }

    public static async logout(req : express.Request, res : express.Response, next : express.NextFunction) {
        try {

            const {refreshToken} = req.cookies

            await UserService.logout(refreshToken)

            res.clearCookie(UserController.refreshTokenCookieName)

            const response = ApiResponse.created("user logged out")

            next(response)

        } catch (error : any) {
            next(error)
        }
    }
}