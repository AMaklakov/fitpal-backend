import { IncomingMessage, Server, ServerResponse } from 'http'

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface FastifyInstance<HttpServer = Server, HttpRequest = IncomingMessage, HttpResponse = ServerResponse> {}
}
