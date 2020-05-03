import { nanoid } from 'nanoid'
import crypto from 'crypto'

export const generateId = (): string => nanoid()

export const createHash = (str: string): string => {
  return crypto.createHash('sha1').update(str).digest('base64')
}
