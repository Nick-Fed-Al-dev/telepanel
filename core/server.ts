import * as express from "express"
import * as path from "path"
import * as cors from "cors"
import * as cookieParser from "cookie-parser"

import {config} from "../modules/config/config"
import {logger} from "../modules/logger"
import {database} from "../modules/database"
import {corsConfig} from "../modules/config/cors.config"
import {router} from "./router"
import {responseMiddleware} from "../modules/middlewares/response.middleware"
import {validationMiddleware} from "../modules/middlewares/validation.middleware"

// создаем экземпляр приложения
const server = express()

// конфигурируем middlewares
server.use(cors(corsConfig()))
server.use(express.json())
server.use(cookieParser())

// кастомные middlewares
server.use("/api", router)
server.use(validationMiddleware())
server.use(responseMiddleware())

// Выводим в отдельные константы данные для запуска сервера
const PORT = Number(config.PORT || config.DEV_PORT)
const MODE = config.NODE_ENV || "development"

// если приложение находится в продакшене раздаем клиент
if(MODE === "production") {
    server.get("/", (req, res) => {
        res.sendFile(path.resolve("client", "build", "index.html"))
    })
}

// экспортируем функцию запускающею сервер
export const start = async () => {
    try {
        // запускаем базу данных
        await database.initialize()
        logger.info("database was initialized")

        // запускаем сервер
        server.listen(PORT, () => {
            logger.info(`server has been started...`)
            logger.info(`mode: ${MODE}`)
            logger.info(`port: ${PORT}`)
        })
    } catch (error : any) {
        // в случае ошибки выводим в логи и завершаем процесс
        logger.error(error)
        process.exit(1)
    }
}