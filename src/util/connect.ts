/* eslint-disable @typescript-eslint/ban-ts-ignore */
import mongoose from 'mongoose'
// @ts-ignore
import { Logger } from 'fastify'
import plugin from 'fastify-plugin'

interface IConnectArgs {
  dbUrl: string
  logger: Logger
}

export const connectToDb = async ({ dbUrl, logger }: IConnectArgs, done?: () => void) => {
  const connect = async () => {
    logger.info(`Trying to connect to ${dbUrl}`)
    mongoose
      .connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        logger.info(`Successfully connected to ${dbUrl}`)
        done?.()
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

export const dbPlugin = ({ dbUrl, logger }: IConnectArgs) =>
  plugin((server, options, next) => connectToDb({ dbUrl, logger }, next))
