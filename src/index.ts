/* eslint-disable no-console,@typescript-eslint/ban-ts-ignore */
import sourceMapSupport from 'source-map-support'
import fastify from 'fastify'
import fastifyBlipp from 'fastify-blipp'
import { apiRoutes } from '@routes/api'
import { ADDRESS, PORT, USE_HTTPS } from '@const/config'
import fastifyHelmet from 'fastify-helmet'
import fastifyCors from 'fastify-cors'
import fastifyStatic from 'fastify-static'
import path from 'path'
import dotenvFlow from 'dotenv-flow'
import { HTTPS_CA, HTTPS_CERT, HTTPS_KEY } from '@const/https-setup'

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
  logger: true,
  ...(USE_HTTPS ? serverHttpsOptions : {}),
})

server
  .register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
    dotfiles: 'allow',
  })
  // @ts-ignore
  .register(fastifyHelmet)
  // @ts-ignore
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
