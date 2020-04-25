import { FastifyInstance, Plugin } from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import { getTrainingByDate, getTrainingById } from '@services/traninig.service'

export const trainingRoutes: Plugin<FastifyInstance, IncomingMessage, ServerResponse, any> = (server, opts, next) => {
  server.get('/', (req, reply) => {
    const date = req.query.date
    const trainings = getTrainingByDate(date)

    if (!trainings) {
      reply.code(400)
      reply.send({
        message: 'Not found by date',
      })
    }

    reply.code(200)
    reply.send(trainings)
  })

  server.get('/:id', (req, reply) => {
    const trainingId: string = req.params.id
    const training = getTrainingById(trainingId)

    if (!training) {
      reply.code(400)
      reply.send({
        message: 'Not found by id',
      })
    }

    reply.code(200)
    reply.send(training)
  })

  server.post('/', (req, reply) => {
    const training = req.body.training
  })

  next()
}
