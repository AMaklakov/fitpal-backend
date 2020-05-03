import { FastifyInstance, Plugin } from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import {
  createTraining,
  getTrainingByDate,
  getTrainingById,
  removeTrainingById,
  updateTraining,
} from '@services/traninig.service'

export const trainingRoutes: Plugin<FastifyInstance, IncomingMessage, ServerResponse, any> = (server, opts, next) => {
  server.get('/', { preValidation: [server.verifyJwt] }, (req, reply) => {
    const date = req.query.date
    const trainings = getTrainingByDate(date)

    if (!trainings) {
      reply.code(400)
      reply.send({
        message: 'Not found by date',
      })

      return
    }

    reply.code(200)
    reply.send(trainings)
  })

  server.get('/:id', { preValidation: [server.verifyJwt] }, (req, reply) => {
    const trainingId: string = req.params.id
    const training = getTrainingById(trainingId)

    if (!training) {
      reply.code(400)
      reply.send({
        message: 'Not found by id',
      })

      return
    }

    reply.code(200)
    reply.send(training)
  })

  server.post('/', { preValidation: [server.verifyJwt] }, (req, reply) => {
    const training = req.body.training
    const createdTraining = createTraining(training)

    if (createdTraining === null) {
      reply.code(400)
      reply.send({
        message: 'Invalid training',
      })

      return
    }

    reply.code(201)
    reply.send({
      training: createdTraining,
    })
  })

  server.put('/:id', { preValidation: [server.verifyJwt] }, (req, reply) => {
    const trainingId: string = req.params.id
    const training = req.body.training
    const updatedTraining = updateTraining(trainingId, training)

    if (updatedTraining === null) {
      reply.code(400)
      reply.send({
        message: 'Invalid training or training not found',
      })

      return
    }

    reply.code(200)
    reply.send({
      training: updatedTraining,
    })
  })

  server.delete('/:id', { preValidation: [server.verifyJwt] }, (req, reply) => {
    const trainingId: string = req.params.id
    const isSuccessfulDeleted = removeTrainingById(trainingId)

    if (!isSuccessfulDeleted) {
      reply.code(400)
      reply.send({
        message: 'Cannot delete',
      })

      return
    }

    reply.code(200)
    reply.send()
  })

  next()
}
