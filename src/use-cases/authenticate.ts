import { OrgRepository } from '@/repository/org-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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
      throw new ResourceNotFoundError()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
