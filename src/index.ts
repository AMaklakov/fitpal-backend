/* eslint-disable no-console,@typescript-eslint/ban-ts-ignore */
import sourceMapSupport from 'source-map-support'
import fastify from 'fastify'
import fastifyBlipp from 'fastify-blipp'
import { apiRoutes } from '@routes/api'
import { ADDRESS, PORT } from '@const/config'
import fastifyHelmet from 'fastify-helmet'
import fastifyCors from 'fastify-cors'

sourceMapSupport.install()

const server = fastify({
  logger: true,
  // http2: true,
  // https: {
  //   allowHTTP1: true,
  //   key: HTTPS_KEY,
  //   cert: HTTPS_CERT,
  //   ca: [],
  // },
})

server
  // @ts-ignore
  .register(fastifyHelmet)
  // @ts-ignore
  .register(fastifyCors, { origin: false })
  .register(fastifyBlipp)
  .register(apiRoutes, { prefix: '/api/v1' })
// @ts-ignore
// .addHook('onRequest', (req, reply, payload, done) => {
//   console.log(req, reply, payload)
//   done()
// })
// // @ts-ignore
// .addHook('preSerialization', (req, reply, payload, done) => {
//   console.log(req, reply, payload)
//   done()
// })
// // @ts-ignore
// .addHook('preHandler', (req, reply, payload, done) => {
//   console.log(req, reply, payload)
//   done()
// })
// // @ts-ignore
// .addHook('preParsing', (req, reply, payload, done) => {
//   console.log(req, reply, payload)
//   done()
// })
// @ts-ignore
// .addHook('onResponse', (req, res, done) => {
//   res.header('Access-Control-Allow-Origin', req.headers.origin)
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
//   res.header('Access-Control-Allow-Credentials', 'true')
//   // if it's preflight packet, send 200
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200)
//   }
//
//   done()
// })
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
