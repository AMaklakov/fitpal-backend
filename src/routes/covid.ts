import axios from 'axios'
import { FastifyPlugin } from 'fastify'

const GET_COVID_DATA_URI = 'https://pomber.github.io/covid19/timeseries.json'

export const covidRoutes: FastifyPlugin = (server, opts, next) => {
  server.get('/all', { preValidation: [server.verifyJwt] }, async (request, reply) => {
    try {
      const res = await axios.get(GET_COVID_DATA_URI)
      reply.code(200)
      reply.send(res.data)
    } catch (e) {
      reply.code(500)
      reply.send(e)
    }
  })

  server.get('/country', { preValidation: [server.verifyJwt] }, async (request, reply) => {
    try {
      const res = await axios.get(GET_COVID_DATA_URI)
      reply.code(200)
      reply.send(res.data['Belarus'])
    } catch (e) {
      reply.code(500)
      reply.send(e)
    }
  })

  server.get('/country/latest', { preValidation: [server.verifyJwt] }, (request, reply) => {
    axios
      .get(GET_COVID_DATA_URI)
      .then((res) => res.data['Belarus'].pop())
      .then((data) => {
        reply.code(200)
        reply.send(data)
      })
      .catch((e) => {
        reply.code(500)
        reply.send(e)
      })
  })

  next()
}
