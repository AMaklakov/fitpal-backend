/* eslint-disable */
import mongoose from 'mongoose'
import { Logger } from 'fastify'

interface IConnectArgs {
  dbUrl: string
  logger: Logger
}

export const connectToDb = async ({ dbUrl, logger }: IConnectArgs) => {
  const connect = async () => {
    logger.info(`Trying to connect to ${dbUrl}`)
    mongoose
      .connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        logger.info(`Successfully connected to ${dbUrl}`)
      })
      .catch((error) => {
        logger.fatal(`Error connecting to database: ${error}`)
        return process.exit(1)
      })
  }

  await connect()
  mongoose.connection.on('disconnection', async () => {
    logger.info(`Connection to db is lost, reconnecting...`)
    await connect()
  })
}
