
export interface IConfigNames {
    PORT?: string
    DEV_PORT: string
    APP_HOST: string
    APP_PROTOCOL: string
    NODE_ENV?: string

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

    FREE_TRIAL_DURATION_DAYS: string
    FREE_TRIAL_TARIFF_NAME: string

    TELEGRAM_API_ID: string
    TELEGRAM_API_HASH: string
}