import { Big } from 'big.js'
export class InvalidRequestError extends Error {
  constructor(message: string) {
    super('Invalid Request: ' + message)
  }
}

export class InvalidEmailError extends Error {
  constructor(message: string) {
    super('Invalid Email: ' + message)
  }
}

export class InvalidPasswordError extends Error {
  constructor(message: string) {
    super('Invalid Password: ' + message)
  }
}

export class InvalidWeightError extends Error {
  constructor(message: string) {
    super('Invalid Weight: ' + message)
  }
}

export class InvalidHeightError extends Error {
  constructor(message: string) {
    super('Invalid Height: ' + message)
  }
}

export const isEmail = (email: string): boolean => /^[\w-_]+@[\w-_]+(?:\.\w+)+$/.test(email)

export const isPassword = (password: string): boolean => password.length >= 6 && password.length <= 40

export const isWeight = (weight: string): boolean => new Big(weight).gte(30) && new Big(weight).lte(500)

export const isHeight = (height: string): boolean => new Big(height).gte(50) && new Big(height).lte(350)

export const UserValidation = {
  isEmail,
  isPassword,
  isWeight,
  isHeight,
  InvalidRequestError,
  InvalidEmailError,
  InvalidPasswordError,
  InvalidWeightError,
  InvalidHeightError,
}
