import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export const PORT = Number(process.env.APP_PORT ?? 3001)
export const ADDRESS = process.env.APP_HOST ?? '0.0.0.0'

export const USE_HTTPS = process.env.USE_HTTPS === '1'
