import { createExercise, getExercises, updateExercise } from '@services/exercise.service'
import { ICreateExercise, IExercise } from '@models/exercise.model'
import { IHeaders } from '@routes/types'
import { FastifyPlugin } from 'fastify'

export const exerciseRoutes: FastifyPlugin = (server, opts, next) => {
  server.get<IHeaders>('/', { preValidation: [server.verifyJwt] }, async (req, reply) => {
    const exercises = await getExercises({ userId: req.headers.user })

    reply.code(200).send({ exercises })
    return
  })

  server.get<{ Params: { id: string } }>('/:id', { preValidation: [server.verifyJwt] }, async (req, reply) => {
    const exercises = await getExercises({
      _id: req.params.id,
    })

    return reply.code(200).send(exercises)
  })

  server.post<{ Body: { exercise: Partial<ICreateExercise> } } & IHeaders>(
    '/',
    { preValidation: [server.verifyJwt] },
    async (req, reply) => {
      const exercise = req.body?.exercise

      const createdExercise = await createExercise(exercise, req.headers.user)
      if (createdExercise === null) {
        reply.code(400)
        reply.send({
          message: 'Invalid exercise',
        })

        return
      }

      reply.code(200)
      reply.send({
        exercise: createdExercise,
      })
    }
  )

  server.put<{ Body: { exercise: IExercise } } & IHeaders>(
    '/:id',
    { preValidation: [server.verifyJwt] },
    async (req, reply) => {
      const user = req.headers.user
      const exercise = req.body?.exercise

      const updated = await updateExercise(exercise, user)
      if (updated === null) {
        reply.code(400).send({ message: 'Invalid exercise' })
        return
      }

      reply.code(200).send({ exercise: updated })
      return
    }
  )

  next()
}
