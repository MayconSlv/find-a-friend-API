import { OrgRepository } from '@/repository/org-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  address: string
  phone: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    address,
    phone,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new Error('This email already exists.')
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      cep,
      address,
      phone,
    })

    return {
      org,
    }
  }
}
