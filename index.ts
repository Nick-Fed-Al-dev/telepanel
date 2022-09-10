import {start} from "./core/server"

// Используем IIFE для обработки промиса
(async () => {
    // Функция старт запускает сервер
    await start()
})()
