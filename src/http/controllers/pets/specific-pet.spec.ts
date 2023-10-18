import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Get Specific Pet(e2e))', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a specific pet', async () => {
    await createAndAuthenticateOrg(app)

    const { id: org_id } = await prisma.org.findFirstOrThrow()

    const { id } = await prisma.pet.create({
      data: {
        name: 'Javascript',
        description: 'Um pet muito adorável',
        breed: 'pastor alemão',
        species: 'DOG',
        size: 'SMALL',
        age: 'INFANT',
        gender: 'MALE',
        org_id,
      },
    })

    const response = await request(app.server).get(`/pets/${id}`)

    expect(response.statusCode).toEqual(200)
  })
})
