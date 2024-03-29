/* eslint-disable @typescript-eslint/ban-ts-ignore */
import fastifyPlugin from 'fastify-plugin'
import fastifyJWT from 'fastify-jwt'
import { FastifyReply, FastifyRequest } from 'fastify'

export const jwtMiddleware = fastifyPlugin((server, options, next) => {
  server
    .register(fastifyJWT, { secret: 'supersecret' })
    // @ts-ignore
    .decorate('verifyJwt', async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    })

  next()
})
