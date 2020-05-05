import { FastifyInstance, Plugin } from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import { createExercise, getExercises } from '@services/exercise.service'

export const exerciseRoutes: Plugin<FastifyInstance, IncomingMessage, ServerResponse, any> = (server, opts, next) => {
  server.get('/', { preValidation: [server.verifyJwt] }, async (req, reply) => {
    const exercises = await getExercises({ userId: req.headers.user })

    reply.code(200).send({ exercises })
    return
  })

  server.get('/:id', { preValidation: [server.verifyJwt] }, async (req, reply) => {
    const exercises = await getExercises({
      _id: req.params.id,
    })

    reply.code(200)
    reply.send(exercises)

    return
  })

  server.post('/', { preValidation: [server.verifyJwt] }, async (req, reply) => {
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
  })

  next()
}
