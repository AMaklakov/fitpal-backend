import { FastifyInstance, Plugin } from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import { login, register } from '@services/unauthorized.service'

export const unauthorizedRoutes: Plugin<FastifyInstance, IncomingMessage, ServerResponse, any> = (
  server,
  opts,
  next
) => {
  server.post('/register', async (req, reply) => {
    const user = req.body.user
    const createdUser = await register(user)

    if (!createdUser) {
      reply.code(400)
      reply.send({
        message: 'User is invalid',
      })

      return
    }

    reply.code(201)
    reply.send({
      message: 'User was successively created',
    })
    return
  })

  server.post('/login', async (req, reply) => {
    const user = req.body.user
    const foundUser = await login(user)

    if (!foundUser) {
      reply.code(400)
      reply.send({ message: 'Data is invalid' })

      return
    }

    const { email, password, _id } = foundUser
    const token = server.jwt.sign({ email, password, _id }, { expiresIn: 8400 })

    reply.status(200).send({ message: 'Successively logged in', token, user: foundUser })
    return
  })

  // server.post('/logout', (req, reply) => {
  //   const training = req.body.training
  //   const createdTraining = createTraining(training)
  //
  //   if (createdTraining === null) {
  //     reply.code(400)
  //     reply.send({
  //       message: 'Invalid training',
  //     })
  //
  //     return
  //   }
  //
  //   reply.code(201)
  //   reply.send({
  //     training: createdTraining,
  //   })
  // })

  next()
}
