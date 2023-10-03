import { OrgRepository } from '@/repository/org-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.orgsRepository.findByEmail(email)

    if (!organization) {
      throw new Error('Organization not found.')
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new Error('Invalid credentials error.')
    }

    return {
      organization,
    }
  }
}
