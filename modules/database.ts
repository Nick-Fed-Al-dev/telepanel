import {DataSource} from "typeorm"
import {postgresqlConfig} from "./config/postgresql.config"
import {UserEntity} from "../core/user/user.entity"
import {RefreshTokenEntity} from "../core/refreshToken/refresh-token.entity"

// перечисляем все сущности в базе
const entities = [UserEntity, RefreshTokenEntity]

// создаем экземпляр базы данных
export const database = new DataSource(postgresqlConfig(entities))