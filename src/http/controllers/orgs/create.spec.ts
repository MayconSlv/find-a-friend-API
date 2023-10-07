import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Create Organization', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a organization', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Maycon Silva',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '(99)99999-9999',
      cep: '99999999',
      address: 'Javascript City',
    })

    expect(response.statusCode).toEqual(201)
  })
})
