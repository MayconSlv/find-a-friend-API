import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFilterPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-filter-pets-by-characteristics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsQuerySchema = z.object({
    species: z
      .enum(['cat', 'dog', 'bird', 'fish', 'rabbit', 'other'])
      .optional()
      .transform((value) => value?.toUpperCase()),
    size: z
      .enum(['small', 'medium', 'large'])
      .optional()
      .transform((value) => value?.toUpperCase()),
    age: z
      .enum(['infant', 'young', 'adult', 'senior'])
      .optional()
      .transform((value) => value?.toUpperCase()),
    gender: z
      .enum(['male', 'female', 'other'])
      .optional()
      .transform((value) => value?.toUpperCase()),
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
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(400).send({ message: 'Bad request.' })
  }
}
