import fs from 'fs'
import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

const readFile = (path: string | undefined): string => (path ? fs.readFileSync(path, 'utf-8') : '')

const KEY_PATH = process.env.LETS_ENCRYPT_KEY
const CERT_PATH = process.env.LETS_ENCRYPT_CERT
const CA_PATH = process.env.LETS_ENCRYPT_CA

export const HTTPS_KEY = readFile(KEY_PATH)
export const HTTPS_CERT = readFile(CERT_PATH)
export const HTTPS_CA = readFile(CA_PATH)
