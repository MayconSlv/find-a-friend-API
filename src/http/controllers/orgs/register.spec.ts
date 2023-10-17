import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'

describe('Register Pet(e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Javascript',
        description: 'Um pet muito adorável',
        breed: 'pastor alemão',
        species: 'DOG',
        size: 'SMALL',
        age: 'INFANT',
        gender: 'MALE',
      })

    expect(response.statusCode).toEqual(201)
  })
})
