import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function OrganizationRoutes(app: FastifyInstance) {
  app.post('/auth', authenticate)
  app.post('/orgs', create)

  app.patch('/token/refresh', refresh)

  app.post('/register', { onRequest: [verifyJWT] }, register)
}
