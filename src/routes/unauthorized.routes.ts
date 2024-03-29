import { login, register } from '@services/unauthorized.service'
import { ICreateUser } from '@models/user.model'
import { IHeaders } from '@routes/types'
import { FastifyPlugin } from 'fastify'

export const unauthorizedRoutes: FastifyPlugin = (server, opts, next) => {
  server.post<{ Body: { user: ICreateUser } }>('/register', async (req, reply) => {
    const user = req.body.user
    const registeredUser = await register(user)

    if (registeredUser.error) {
      reply.code(400)
      reply.send({
        message: registeredUser.error.message,
      })
    }

    reply.code(201)
    reply.send({
      message: 'User was successively created',
    })
    return
  })

  server.post<{ Body: { user: ICreateUser } }>('/login', async (req, reply) => {
    const user = req.body.user
    const { user: foundUser, error } = await login(user)

    if (error) {
      reply.code(400)
      reply.send({
        message: error.message,
      })

      return
    }

    if (!foundUser) {
      return
    }

    const { email, password, _id } = foundUser
    const token = server.jwt.sign({ email, password, _id }, { expiresIn: 8400 })

    reply.status(200).send({ message: 'Successively logged in', token, user: foundUser })
    return
  })

  server.post<IHeaders>('/logout', { preValidation: [server.verifyJwt] }, (req, reply) => {
    // token should already be provided (from preValidation)
    const token = req.headers.authorization?.split(' ')?.[1]

    if (!token) {
      reply.code(401).send({ message: 'unauthorized' })
      return
    }

    reply.code(201).send()
  })

  next()
}
