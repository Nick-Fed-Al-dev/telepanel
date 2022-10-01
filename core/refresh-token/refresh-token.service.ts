import * as jwt from "jsonwebtoken"

import {PayloadUserDto} from "../user/dto/payload-user.dto"
import {config} from "../../modules/config/config"
import {Time} from "../../modules/Time"
import {RefreshTokenEntity} from "./refresh-token.entity"

export class RefreshTokenService {

    public static generateTokenPair(payloadUserDto : PayloadUserDto) {

        const accessTokenDurationMs = Time.convertDaysToMs(config.ACCESS_TOKEN_DURATION_DAYS)
        const refreshTokenDurationMs = Time.convertDaysToMs(config.REFRESH_TOKEN_DURATION_DAYS)

        payloadUserDto = JSON.parse(JSON.stringify(payloadUserDto))

        const accessToken = jwt.sign(
            payloadUserDto,
            config.ACCESS_TOKEN_SECRET,
            {expiresIn: accessTokenDurationMs}
        )

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

    public static async saveRefreshToken(refreshToken : string, userId : number) {

        const candidate = await RefreshTokenEntity.findOneBy({userId})

        if(candidate) {
            candidate.refreshToken = refreshToken
            await candidate.save()
            return candidate
        }

        const entityRefreshTokenDto = RefreshTokenEntity.create({userId, refreshToken})
        await entityRefreshTokenDto.save()

        return entityRefreshTokenDto
    }

    public static async removeRefreshToken(refreshToken : string) {
        const entityRefreshTokenDto = await RefreshTokenEntity.findOneBy({refreshToken})
        await entityRefreshTokenDto.remove()
    }

    public static validateAccessToken(accessToken : string) {
        try {
            const payloadUserDto = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
            return payloadUserDto as PayloadUserDto
        } catch (error : any) {}

    }

    public static validateRefreshToken(refreshToken : string) {
        try {
            const payloadUserDto = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET)
            return payloadUserDto as PayloadUserDto
        } catch (error : any) {}
    }

}