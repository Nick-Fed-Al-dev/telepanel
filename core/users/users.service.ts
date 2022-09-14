import * as bcrypt from "bcrypt"
import * as uuid from "uuid"

import {PayloadUserDto} from "./dto/payload-user.dto"
import {RefreshTokensService} from "../refreshTokens/refresh-tokens.service"
import {RegisterUserDto} from "./dto/register-user.dto"
import {UsersEntity} from "./users.entity"
import {config} from "../../modules/config/config"
import {ApiError} from "../../modules/ApiError"
import {LoginUserDto} from "./dto/login-user.dto"
import {RefreshTokensEntity} from "../refreshTokens/refresh-tokens.entity"
import {AuthorizedCredentialUserDto} from "./dto/authorized-credential-user.dto"
import {Mailer} from "../../modules/mailer/Mailer"

// класс нужен для организации бизнес-логики запросов к /api/users
export class UsersService {

    // приватный метод для создания jwt токенов из параметров пользователя и сохранения
    private static async createTokensFromUser(entityUserDto : UsersEntity) : Promise<AuthorizedCredentialUserDto> {

        // приводим обьект из базы к обьекту который можно засунуть в jwt
        const payloadUserDto = new PayloadUserDto(entityUserDto)

        // создаем пару токенов
        const tokenPair = RefreshTokensService.generateTokenPair(payloadUserDto)

        // сохраняем refresh токен
        await RefreshTokensService.saveRefreshToken(tokenPair.refreshToken, payloadUserDto.id)

        // создаем обьект для отправки на клиент сливая payload и токены
        const authorizedCredentialUserDto = new AuthorizedCredentialUserDto({...payloadUserDto, ...tokenPair})

        return authorizedCredentialUserDto
    }

    // метод отвечает за активацию аккаунта пользователя
    public static async activate(activationCode : string) {

        // получаем пользователя из базы по коду активации
        const entityUsersDto = await UsersEntity.findOneBy({activationCode})

        // если пользователя нет выбрасываем ошибку not found
        if(!entityUsersDto) {
            ApiError.notFound("no user with this activation code found")
        }

        // ставим флаг isActivated в позицию true и сохраняем обьект пользователя
        entityUsersDto.isActivated = true
        await entityUsersDto.save()
    }

    // метод отвечает за создание сущности пользователя в базе и сопутствующею логику
    public static async register(registerUserDto : RegisterUserDto) : Promise<AuthorizedCredentialUserDto> {
        // пробуем найти пользователя по email
        const candidate = await UsersEntity.findOneBy({email: registerUserDto.email})

        // если пользователь с этим email уже есть, то выбрасываем ошибку bad request
        if (candidate) {
            ApiError.badRequest("user with this email already exist")
        }

        let entityUserDto = registerUserDto as unknown as UsersEntity

        // хэшируем пароль и заменяем его в обьекте регистрации
        const hashedPassword = await bcrypt.hash(entityUserDto.password, Number(config.PASSWORD_HASH_SALT))
        const activationCode = uuid.v4()

        entityUserDto.password = hashedPassword
        entityUserDto.activationCode = activationCode

        // создаем и сохраняем сущность в базе
        entityUserDto = UsersEntity.create(registerUserDto as unknown as UsersEntity)
        await entityUserDto.save()

        const activationLink = `${config.APP_URL}/api/users/activate/${entityUserDto.activationCode}`
        const mailer = new Mailer()
        await mailer.sendActivationMail(entityUserDto.email, activationLink)

        // создаем токены и на выход получаем обьект со всем нам нужным
        const authorizedCredentialUserDto = await UsersService.createTokensFromUser(entityUserDto)

        return authorizedCredentialUserDto
    }

    // метод отвечает за вход пользователя и сопутствующию логику
    public static async login(loginUserDto : LoginUserDto) : Promise<AuthorizedCredentialUserDto> {
        // пробуем найти пользователя по email
        const candidate = await UsersEntity.findOneBy({email: loginUserDto.email})

        // если пользователя нет, значит он не может войти
        // выбрасываем ошибку not found
        if(!candidate) {
            ApiError.notFound("user not found")
        }

        // сравниваем пароли
        const isPasswordMatch = await bcrypt.compare(loginUserDto.password, candidate.password)

        // если пароли не совпали - выбрасываем ошибку bad request
        if(!isPasswordMatch) {
            ApiError.badRequest("incorrect password")
        }

        // получаем обьект с данными пользователями и токенами
        const authorizedCredentialUserDto = await UsersService.createTokensFromUser(candidate)

        return authorizedCredentialUserDto
    }

    // метод отвечает за обновление токена в базе и сопутствующию логику
    public static async refresh(refreshToken : string) : Promise<AuthorizedCredentialUserDto> {
        // расшифровываем refresh токен
        // получаем данные пользователя
        const payloadUserDto = RefreshTokensService.validateRefreshToken(refreshToken)
        // пробуем найти токен в базе
        const entityTokenDto = await RefreshTokensEntity.findOneBy({refreshToken})

        // если токена или данных пользователя нет - выбрасываем ошибку unauthorized
        if(!payloadUserDto || !entityTokenDto) {
            ApiError.unauthorized("no refresh token")
        }

        // находим пользователя в базе по id
        const entityUserDto = await UsersEntity.findOneBy({id: payloadUserDto.id})
        // осуществляем логику с токенами и получаем нужный обьект
        const authorizedCredentialUserDto = await UsersService.createTokensFromUser(entityUserDto)

        return authorizedCredentialUserDto
    }

    // метод отвечает за удаление токена в базе
    public static async logout(refreshToken : string) : Promise<void> {
        // находим токен в базе и удаляем
        const entityTokenDto = await RefreshTokensEntity.findOneBy({refreshToken})
        await entityTokenDto?.remove()
    }
}