import {CorsOptions} from "cors"

// конфигурация корс middleware
export const corsConfig = () : CorsOptions => ({
    origin: "*",
    credentials: true
})