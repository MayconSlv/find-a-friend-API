import { OrganizationWithSameEmailExistsError } from '@/use-cases/errors/organziation-with-same-email-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.coerce.string().min(8),
    address: z.string(),
    phone: z.string().min(14),
    password: z.string().min(6),
  })

  const { name, email, address, cep, password, phone } = createOrgSchema.parse(
    request.body,
  )

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      name,
      email,
      address,
      cep,
      password,
      phone,
    })
  } catch (error) {
    if (error instanceof OrganizationWithSameEmailExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw Error
  }

  reply.status(201).send()
}
