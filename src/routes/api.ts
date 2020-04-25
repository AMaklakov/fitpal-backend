import { FastifyInstance, Plugin } from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import { exerciseRoutes } from '@routes/exercises.routes'
import { covidRoutes } from '@routes/covid'
import { trainingRoutes } from '@routes/training.routes'

export const apiRoutes: Plugin<FastifyInstance, IncomingMessage, ServerResponse, any> = (server, opts, next) => {
  server.register(trainingRoutes, { prefix: '/trainings' })
  server.register(exerciseRoutes, { prefix: '/exercises' })
  server.register(covidRoutes, { prefix: '/covid-statistics' })

  next()
}
