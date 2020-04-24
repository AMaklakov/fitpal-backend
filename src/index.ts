/* eslint-disable no-console,@typescript-eslint/ban-ts-ignore */
import sourceMapSupport from 'source-map-support'
import fastify, { FastifyInstance } from 'fastify'
import fastifyBlipp from 'fastify-blipp'
import { apiRoutes } from '@routes/api'
import { ADDRESS, PORT } from '@const/config'
import fastifyHelmet from 'fastify-helmet'
import fastifyCors from 'fastify-cors'

sourceMapSupport.install()

const server: FastifyInstance = fastify({ logger: true })

server
  .register(fastifyHelmet)
  // @ts-ignore
  .register(fastifyCors, { origin: false })
  .register(fastifyBlipp)
  .register(apiRoutes, { prefix: '/api' })
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

server.ready(err => {
  if (err) throw err
  // server.swagger()
})

process.on('uncaughtException', error => console.error(error))
process.on('unhandledRejection', error => console.error(error))

server.listen(PORT ?? 3001, ADDRESS, (err, address) => {
  if (err) {
    console.log(err)
    server.log.error(err)
    process.exit(1)
  }

  server.log.info(`server listening on ${address}`)
  server.blipp()
})
