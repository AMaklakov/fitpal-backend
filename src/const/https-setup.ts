import fs from 'fs'
import path from 'path'

const FOLDER_PATH = path.join(__dirname, '..', '..', 'public', 'https')

export const HTTPS_KEY = fs.readFileSync(path.join(FOLDER_PATH, 'fastify.key'), 'utf-8')
export const HTTPS_CERT = fs.readFileSync(path.join(FOLDER_PATH, 'fastify.crt'), 'utf-8')
// export const HTTPS_CA = fs.readFileSync(path.join(FOLDER_PATH, 'api_realtycoast_io.crt'), 'utf-8')
