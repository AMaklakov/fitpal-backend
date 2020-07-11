import { createTraining, getTrainings, removeTrainingById, updateTraining } from '@services/traninig.service'
import { IHeaders } from '@routes/types'
import { ITrainingCreate } from '@models/training.model'
import { FastifyPlugin } from 'fastify'

export const trainingRoutes: FastifyPlugin = (server, opts, next) => {
  server.get<IHeaders & { Querystring: { date?: string; startDate?: string; endDate?: string } }>(
    '/',
    { preValidation: [server.verifyJwt] },
    async (req, reply) => {
      const userId = req.headers.user
      const date = req.query.date
      const dateStart = req.query.startDate
      const dateEnd = req.query.endDate

      const trainings = await getTrainings({ date, userId, dateEnd, dateStart })

      if (!trainings) {
        reply.code(400).send({ message: 'Not found by date' })

        return
      }

      reply.code(200).send(trainings)
    }
  )

  server.get<IHeaders & { Params: { id: string } }>(
    '/:id',
    { preValidation: [server.verifyJwt] },
    async (req, reply) => {
      const userId = req.headers.user
      const trainingId: string = req.params.id

      const training = await getTrainings({ _id: trainingId, userId })

      if (!training) {
        reply.code(400).send({ message: 'Not found by id' })

        return
      }

      reply.code(200).send(training)
      return
    }
  )

  server.post<{ Body: { training: ITrainingCreate } } & IHeaders>(
    '/',
    { preValidation: [server.verifyJwt] },
    async (req, reply) => {
      const user = req.headers.user
      const training = req.body.training
      const createdTraining = await createTraining(training, user)

      if (createdTraining === null) {
        reply.code(400).send({ message: 'Invalid training' })

        return
      }

      reply.code(201).send({ training: createdTraining })
      return
    }
  )

  server.put<IHeaders & { Params: { id?: string }; Body: { training: ITrainingCreate } }>(
    '/:id',
    { preValidation: [server.verifyJwt] },
    async (req, reply) => {
      const userId = req.headers.user
      const trainingId = req.params.id
      const training = req.body.training

      const updatedTraining = await updateTraining({ _id: trainingId, userId }, training)

      if (updatedTraining === null) {
        reply.code(400).send({ message: 'Invalid training or training not found' })

        return
      }

      reply.code(200).send({ training: updatedTraining })
      return
    }
  )

  server.delete<IHeaders & { Params: { id?: string } }>(
    '/:id',
    { preValidation: [server.verifyJwt] },
    async (req, reply) => {
      const userId = req.headers.user
      const trainingId = req.params.id

      const isSuccessfulDeleted = await removeTrainingById({ _id: trainingId, userId })
      if (!isSuccessfulDeleted) {
        reply.code(400).send({ message: 'Cannot delete' })
        return
      }

      reply.code(200).send()
      return
    }
  )

  next()
}
