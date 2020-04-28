import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()
const { APP_PORT, APP_HOST, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, USE_HTTPS: USE_HTTPS_ENV } = process.env

export const PORT = Number(APP_PORT ?? 3001)
export const ADDRESS = APP_HOST ?? '0.0.0.0'

export const USE_HTTPS = USE_HTTPS_ENV === '1'

export const DB_ADDRESS = `${DATABASE_HOST ?? ''}:${DATABASE_PORT ?? ''}/${DATABASE_NAME ?? ''}`
