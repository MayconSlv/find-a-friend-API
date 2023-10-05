import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetByIdUseCase } from '@/use-cases/factories/make-get-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function specificPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = petIdParamsSchema.parse(request.params)

  try {
    const getPetByIdUseCase = makeGetPetByIdUseCase()

    const { pet } = await getPetByIdUseCase.execute({
      petId: id,
    })

    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw Error
  }
}
