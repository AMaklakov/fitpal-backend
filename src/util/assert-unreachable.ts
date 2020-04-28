/**
 * In order to get more info about it, you may go here:
 * https://dev.to/babak/exhaustive-type-checking-with-typescript-4l3f
 */
export const assertUnreachable = (arg: never): never => {
  throw new Error(`Not expected to be here with arguments: ${arg}`)
}
