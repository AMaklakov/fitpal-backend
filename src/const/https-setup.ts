import fs from 'fs'

const FOLDER = '/etc/letsencrypt/live/fitpal.tk/'

export const HTTPS_KEY = fs.readFileSync(FOLDER + 'privkey.pem', 'utf-8')
export const HTTPS_CERT = fs.readFileSync(FOLDER + 'fullchain.pem', 'utf-8')
export const HTTPS_CA = fs.readFileSync(FOLDER + 'chain.pem', 'utf-8')
