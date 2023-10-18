import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

describe('Fetch pets (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all pets by user city', async () => {
    await createAndAuthenticateOrg(app)

    const { id } = await prisma.org.findFirstOrThrow()

    await prisma.pet.createMany({
      data: [
        {
          age: 'ADULT',
          breed: 'sem raça',
          description: 'uma gata muito adorável',
          gender: 'FEMALE',
          name: 'Nala',
          org_id: id,
          size: 'LARGE',
          species: 'CAT',
        },
        {
          age: 'ADULT',
          breed: 'pastor alemao',
          description: 'um cão muito brincalhão',
          gender: 'FEMALE',
          name: 'Tombo',
          org_id: id,
          size: 'LARGE',
          species: 'DOG',
        },
      ],
    })

    const response = await request(app.server).get(`/javascript/pets`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Nala',
        species: 'CAT',
      }),
      expect.objectContaining({
        name: 'Tombo',

        species: 'DOG',
      }),
    ])
  })
})
