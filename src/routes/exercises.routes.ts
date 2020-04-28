import { FastifyInstance, Plugin } from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import { createExercise, getExercises } from '@services/exercise.service'

export const exerciseRoutes: Plugin<FastifyInstance, IncomingMessage, ServerResponse, any> = (server, opts, next) => {
  server.get('/', async (req, reply) => {
    const exercises = await getExercises()

    reply.code(200)
    reply.send(exercises)

    return
  })

  server.get('/:id', async (req, reply) => {
    const exercises = await getExercises({
      _id: req.params.id,
    })

    reply.code(200)
    reply.send(exercises)

    return
  })

  server.post('/', async (req, reply) => {
    const exercise = req.body?.exercise

    const createdExercise = await createExercise(exercise)
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
