import * as express from "express"
import * as path from "path"
import * as cors from "cors"
import * as cookieParser from "cookie-parser"

import {config} from "../modules/config/config"
import {logger} from "../modules/logger"
import {database} from "../modules/database"
import {corsConfig} from "../modules/config/corsConfig"
import {router} from "./router"
import {responseMiddleware} from "../modules/middlewares/response.middleware"

const server = express()

server.use(cors(corsConfig()))
server.use(express.json())
server.use(cookieParser())

server.use("/api", router)
server.use(responseMiddleware())

const PORT = Number(config.PORT || config.DEV_PORT)
const MODE = config.NODE_ENV || "development"

if(MODE === "production") {
    server.get("/", (req, res) => {
        res.sendFile(path.resolve("client", "build", "index.html"))
    })
}

export const start = async () => {
    try {
        await database.initialize()
        logger.info("database was initialized")

        server.listen(PORT, () => {
            logger.info(`server has been started...`)
            logger.info(`mode: ${MODE}`)
            logger.info(`port: ${PORT}`)
        })
    } catch (error : any) {
        logger.error(error)
        process.exit(1)
    }
}