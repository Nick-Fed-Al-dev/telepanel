import * as express from "express"
import * as path from "path"
import * as cors from "cors"
import * as cookieParser from "cookie-parser"
import * as http from "http"
import * as SocketIO from "socket.io"

import {config} from "../modules/config/config"
import {logger} from "../modules/logger"
import {database} from "../modules/database"
import {corsConfig} from "../modules/config/cors.config"
import {router} from "./router"
import {responseMiddleware} from "../modules/middlewares/response.middleware"
import {validationMiddleware} from "../modules/middlewares/validation.middleware"

const app = express()

app.use(cors(corsConfig()))
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)
app.use(validationMiddleware())
app.use(responseMiddleware())

const PORT = Number(config.PORT || config.DEV_PORT)
const MODE = config.NODE_ENV || "development"

if(MODE === "production") {
    app.get("/", (req, res) => {
        res.sendFile(path.resolve("client", "build", "index.html"))
    })
}

export const start = async () => {
    try {
        await database.initialize()
        logger.info("database was initialized")

        app.listen(PORT, () => {
            logger.info(`server has been started...`)
            logger.info(`mode: ${MODE}`)
            logger.info(`port: ${PORT}`)
        })
    } catch (error : any) {
        logger.error(error)
        process.exit(1)
    }
}