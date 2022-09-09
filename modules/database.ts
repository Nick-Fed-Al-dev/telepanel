import {DataSource} from "typeorm"
import {postgresqlConfig} from "./config/postgresql.config"
import {UsersEntity} from "../core/users/users.entity"
import {RefreshTokensEntity} from "../core/refreshTokens/refresh-tokens.entity"

const entities = [UsersEntity, RefreshTokensEntity]

export const database = new DataSource(postgresqlConfig(entities))