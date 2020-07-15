import { exerciseRoutes } from '@routes/exercises.routes'
import { covidRoutes } from '@routes/covid'
import { trainingRoutes } from '@routes/training.routes'
import { unauthorizedRoutes } from '@routes/unauthorized.routes'
import { FastifyPlugin } from 'fastify'

export const apiRoutes: FastifyPlugin = (server, opts, next) => {
  server.register(unauthorizedRoutes)

  server.register(trainingRoutes, { prefix: '/trainings' })
  server.register(exerciseRoutes, { prefix: '/exercises' })
  server.register(covidRoutes, { prefix: '/covid-statistics' })

  next()
}
