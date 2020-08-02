import { IHeaders } from '@routes/types'
import { IUpdateUser } from '@models/user.model'
import { updateUser } from '@services/user.service'
import { FastifyPlugin } from 'fastify'

export const userRoutes: FastifyPlugin = (server, opts, next) => {
  server.put<IHeaders & { Body: { user: IUpdateUser } }>(
    '/',
    { preValidation: [server.verifyJwt] },
    async (req, reply) => {
      const user = req.body.user

      const updatedUser = await updateUser({ _id: user._id }, user)

      if (updatedUser.error) {
        reply.code(201)
        reply.send({
          message: updatedUser.error.message,
        })
        return
      }

      reply.code(201)
      reply.send({
        message: 'User was successively udpated',
      })
      return
    }
  )

  next()
}
