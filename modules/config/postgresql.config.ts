import {BaseEntity, DataSourceOptions} from "typeorm"
import {config} from "./config"

// конфигурируем базу данных
// аргументов принимаем массив сущностей базы
export const postgresqlConfig = (entities : typeof BaseEntity[]) : DataSourceOptions => ({
    type: "postgres",
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: true,
    entities: [...entities]
})