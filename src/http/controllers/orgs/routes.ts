import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function OrganizationRoutes(app: FastifyInstance) {
  app.post('/auth', authenticate)
  app.post('/orgs', create)

  app.post('/register', { onRequest: [verifyJWT] }, register)
}
