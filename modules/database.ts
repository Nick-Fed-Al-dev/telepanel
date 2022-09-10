import {DataSource} from "typeorm"
import {postgresqlConfig} from "./config/postgresql.config"
import {UsersEntity} from "../core/users/users.entity"
import {RefreshTokensEntity} from "../core/refreshTokens/refresh-tokens.entity"

// перечисляем все сущности в базе
const entities = [UsersEntity, RefreshTokensEntity]

// создаем экземпляр базы данных
export const database = new DataSource(postgresqlConfig(entities))