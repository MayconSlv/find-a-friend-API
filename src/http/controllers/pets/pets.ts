import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetsUseCase } from '@/use-cases/factories/make-get-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function pets(request: FastifyRequest, reply: FastifyReply) {
  const addressParamsSchema = z.object({
    address: z.string(),
  })

  const { address } = addressParamsSchema.parse(request.params)

  try {
    const getPetsUseCase = makeGetPetsUseCase()

    const { pets } = await getPetsUseCase.execute({ address })

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw Error
  }
}
