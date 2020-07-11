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

export const isEmail = (email: string): boolean => /^[\w-_]+@[\w-_]+(?:\.\w+)+$/.test(email)
