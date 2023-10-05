import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFilterPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-filter-pets-by-characteristics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsQuerySchema = z.object({
    species: z.string().optional(),
    size: z.string().optional(),
    age: z.string().optional(),
    gender: z.string().optional(),
  })

  const addressParamsSchema = z.object({
    address: z.string(),
  })

  try {
    const { age, gender, size, species } = filterPetsQuerySchema.parse(
      request.query,
    )
    const { address } = addressParamsSchema.parse(request.params)

    const filterPetsUseCase = makeFilterPetsByCharacteristicsUseCase()
    const { pets } = await filterPetsUseCase.execute({
      address,
      age,
      gender,
      size,
      species,
    })

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(200).send()
    }

    throw Error
  }
}
