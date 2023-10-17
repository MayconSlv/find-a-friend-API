import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'Maycon Silva',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '(99)99999-9999',
      cep: '99999999',
      address: 'Javascript City',
    },
  })

  const response = await request(app.server).post('/auth').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = response.body

  return {
    token,
  }
}
