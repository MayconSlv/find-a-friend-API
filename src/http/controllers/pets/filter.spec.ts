import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

describe('Filter Pets (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by filter', async () => {
    await createAndAuthenticateOrg(app)

    const { id } = await prisma.org.findFirstOrThrow()

    await prisma.pet.createMany({
      data: [
        {
          age: 'ADULT',
          breed: 'sem raça',
          description: 'uma gata super amorosa',
          gender: 'FEMALE',
          name: 'Nala',
          org_id: id,
          size: 'LARGE',
          species: 'CAT',
        },
        {
          age: 'ADULT',
          breed: 'pastor alemao',
          description: '',
          gender: 'FEMALE',
          name: '',
          org_id: id,
          size: 'LARGE',
          species: 'DOG',
        },
      ],
    })

    const response = await request(app.server)
      .get('/javascript/pets/filter')
      .query({
        age: 'adult',
        gender: 'female',
        species: 'cat',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Nala',
      }),
    ])
  })
})
