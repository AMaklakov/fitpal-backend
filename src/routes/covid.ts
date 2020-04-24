import { FastifyInstance, Plugin } from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import axios from 'axios'

export const covidRoutes: Plugin<FastifyInstance, IncomingMessage, ServerResponse, any> = (server, opts, next) => {
  server.get('/all', async (request, reply) => {
    try {
      const res = await axios.get('https://pomber.github.io/covid19/timeseries.json')
      reply.code(200)
      reply.send(res.data)
    } catch (e) {}
  })

  server.get('/country', async (request, reply) => {
    try {
      const res = await axios.get('https://pomber.github.io/covid19/timeseries.json')
      reply.code(200)
      reply.send(res.data['Belarus'])
    } catch (e) {}
  })

  server.get('/country/latest', (request, reply) => {
    axios
      .get('https://pomber.github.io/covid19/timeseries.json')
      .then(res => res.data['Belarus'].pop())
      .then(data => {
        reply.code(200)
        reply.send(data)
      })
      .catch()
  })

  next()
}
