import fp from 'fastify-plugin'
import { FastifyLoggerOptions } from 'fastify/types/logger'

export const loggerOptions: FastifyLoggerOptions = {
  prettyPrint: true,
  // @ts-ignore
  serializers: {
    req: (request) => {
      return {
        method: request.method as string,
        version: request.httpVersion,
        url: request.url as string,
        headers: request.headers,
        hostname: (request as any).hostname,
        remoteAddress: (request as any).ip,
        remotePort: request.connection.remotePort as number,
      }
    },
    res: (reply) => {
      return {
        statusCode: reply.statusCode,
        payload: JSON.parse((reply as any).payload),
      }
    },
  },
}

export const loggerMiddleware = fp((server, options, done) => {
  server
    .addHook('preHandler', (req, res, done) => {
      req.log.info({ body: req.body })
      done()
    })
    .addHook('onSend', (request, reply, payload, done) => {
      Object.assign(reply, { payload })
      // @ts-ignore
      done()
    })

  done()
})
