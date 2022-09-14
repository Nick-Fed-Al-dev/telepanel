
// перечисляем все наименования из .еnv
export interface IConfigNames {
    PORT?: string
    DEV_PORT: string
    NODE_ENV?: string
    APP_URL: string

    DB_HOST: string
    DB_PORT: string
    DB_PASSWORD: string
    DB_USERNAME: string
    DB_NAME: string

    REFRESH_TOKEN_DURATION_DAYS: string
    ACCESS_TOKEN_DURATION_DAYS: string
    REFRESH_TOKEN_SECRET: string
    ACCESS_TOKEN_SECRET: string
    PASSWORD_HASH_SALT: string

    SMPT_HOST: string
    SMTP_PORT: string
    SMTP_USER: string
    SMTP_PASSWORD: string
}