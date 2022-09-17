import {DataSource} from "typeorm"
import {postgresqlConfig} from "./config/postgresql.config"
import {UserEntity} from "../core/user/user.entity"
import {RefreshTokenEntity} from "../core/refreshToken/refresh-token.entity"

const entities = [UserEntity, RefreshTokenEntity]

export const database = new DataSource(postgresqlConfig(entities))