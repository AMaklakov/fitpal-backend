/* eslint-disable @typescript-eslint/ban-ts-ignore */
import fastifyPlugin from 'fastify-plugin'
import fastifyJWT from 'fastify-jwt'
import { FastifyReply, FastifyRequest } from 'fastify'

export const jwtMiddleware = fastifyPlugin((server, options, next) => {
  server
    .register(fastifyJWT, { secret: 'supersecret' })
    .decorate('verifyJwt', async (request: FastifyRequest, reply: FastifyReply<any>) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    })

  next()
})
