/* eslint-disable no-console */
import sourceMapSupport from 'source-map-support'
import fastify from 'fastify'
import fastifyBlipp from 'fastify-blipp'
import { apiRoutes } from '@routes/api'
import { ADDRESS, DB_ADDRESS, PORT, USE_HTTPS } from '@const/config'
import fastifyHelmet from 'fastify-helmet'
import fastifyCors from 'fastify-cors'
import fastifyStatic from 'fastify-static'
import path from 'path'
import dotenvFlow from 'dotenv-flow'
import { HTTPS_CA, HTTPS_CERT, HTTPS_KEY } from '@const/https-setup'
import { dbPlugin } from '@util/connect'
import { jwtMiddleware } from '@middlewares/jwt.middleware'
import { loggerMiddleware, loggerOptions } from '@middlewares/logger.middleware'

sourceMapSupport.install()
dotenvFlow.config()

const serverHttpsOptions = {
  http2: true,
  https: {
    allowHTTP1: true,
    key: HTTPS_KEY,
    cert: HTTPS_CERT,
    ca: [HTTPS_CA],
  },
}

const server = fastify({
  logger: loggerOptions,
  ...(USE_HTTPS ? serverHttpsOptions : {}),
})

server
  .register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
    dotfiles: 'allow',
  })
  .register(dbPlugin({ dbUrl: DB_ADDRESS, logger: server.log }))
  .register(jwtMiddleware)
  .register(loggerMiddleware)
  .register(fastifyHelmet)
  .register(fastifyCors, { origin: false })
  .register(fastifyBlipp)
  .register(apiRoutes, { prefix: '/api/v1' })
// .register(fastifySwagger, {
//   routePrefix: '/documentation',
//   swagger: {
//     info: {
//       title: 'Test swagger',
//       description: 'testing the fastify swagger api',
//       version: '0.1.0',
//     },
//   },
//   exposeRoute: true,
// })

server.ready((err) => {
  if (err) throw err
  // server.swagger()
})

process.on('uncaughtException', (error) => console.error(error))
process.on('unhandledRejection', (error) => console.error(error))

server.listen(PORT, ADDRESS, (err, address) => {
  if (err) {
    console.log(err)
    server.log.error(err)
    process.exit(1)
  }

  server.blipp()
  server.log.info(`server listening on ${address}`)
})
