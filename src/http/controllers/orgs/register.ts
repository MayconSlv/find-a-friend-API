import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    breed: z.string(),
    species: z.enum(['CAT', 'DOG', 'BIRD', 'FISH', 'RABBIT', 'OTHER']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    age: z.enum(['INFANT', 'YOUNG', 'ADULT', 'SENIOR']),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  })

  const data = registerPetBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    await registerPetUseCase.execute({
      ...data,
      org_id: request.user.sub,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
