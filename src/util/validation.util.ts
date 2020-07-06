export interface IException {
  message: string
  getMessage: () => string
}

export const ValidationException = (message: string): IException => {
  const validationException: IException = {
    message,
    getMessage: function (): string {
      return this.message
    },
  }
  return validationException
}

export const isEmail = (email: string): boolean => {
  return /^[\w-_]+@[\w-_]+(?:\.\w+)+$/.test(email)
}
