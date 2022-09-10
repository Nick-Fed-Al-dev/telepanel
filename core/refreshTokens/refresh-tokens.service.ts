import * as jwt from "jsonwebtoken"

import {PayloadUserDto} from "../users/dto/payload-user.dto"
import {config} from "../../modules/config/config"
import {Time} from "../../modules/Time"
import {RefreshTokensEntity} from "./refresh-tokens.entity"

// класс нужен для осуществления бизнес-логики с refresh токенами
export class RefreshTokensService {

    // метод для создания пары токенов
    public static generateTokenPair(payloadUserDto : PayloadUserDto) {
        // получаем время жизни токенов и переводим в миллисекунды
        const accessTokenDurationMs = Time.convertDaysToMs(config.ACCESS_TOKEN_DURATION_DAYS)
        const refreshTokenDurationMs = Time.convertDaysToMs(config.REFRESH_TOKEN_DURATION_DAYS)

        // очищаем обьект пользовательских данных от родительского класса
        // jwt требует чистый обьект
        payloadUserDto = JSON.parse(JSON.stringify(payloadUserDto))

        // подписываем access токен
        const accessToken = jwt.sign(
            payloadUserDto,
            config.ACCESS_TOKEN_SECRET,
            {expiresIn: accessTokenDurationMs}
        )

        // подписываем refresh токен
        const refreshToken = jwt.sign(
            payloadUserDto,
            config.REFRESH_TOKEN_SECRET,
            {expiresIn: refreshTokenDurationMs}
        )

        return {
            accessToken,
            refreshToken
        }
    }

    // метод для сохранения refresh токена в базе
    public static async saveRefreshToken(refreshToken : string, userId : number) {
        // пробуем найти токен в базе
        const candidate = await RefreshTokensEntity.findOneBy({userId})

        // если сущность в базе уже есть - заменяем токен на новый и сохраняем
        if(candidate) {
            candidate.refreshToken = refreshToken
            await candidate.save()
            return candidate
        }

        // если токена нет - создаем и сохраняем
        const entityRefreshTokenDto = RefreshTokensEntity.create({userId, refreshToken})
        await entityRefreshTokenDto.save()

        return entityRefreshTokenDto
    }

    // метод для удаления токена в базе
    public static async removeRefreshToken(refreshToken : string) {
        // находим сущность в базе и удаляем
        const entityRefreshTokenDto = await RefreshTokensEntity.findOneBy({refreshToken})
        await entityRefreshTokenDto.remove()
    }

    // метод для расшифровки access токена
    public static validateAccessToken(accessToken : string) {
        // если токен просрочен jwt выбрасывает ошибку
        // на нужно ее проигнорить
        // для этого реализуем try-catch и catch оставляем пустым
        try {
            // расшифровываем access токен и возвращаем данные
            const payloadUserDto = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
            return payloadUserDto as PayloadUserDto
        } catch (error : any) {}

    }

    public static validateRefreshToken(refreshToken : string) {
        // если токен просрочен jwt выбрасывает ошибку
        // на нужно ее проигнорить
        // для этого реализуем try-catch и catch оставляем пустым
        try {
            // расшифровываем refresh токен и возвращаем данные
            const payloadUserDto = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET)
            return payloadUserDto as PayloadUserDto
        } catch (error : any) {}
    }

}