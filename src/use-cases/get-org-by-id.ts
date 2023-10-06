import { Org } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgRepository } from '@/repository/org-repository'

interface GetOrgByIdUseCaseRequest {
  orgId: string
}

interface GetOrgByIdUseCaseResponse {
  org: Org
}

export class GetOrgByIdUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    orgId,
  }: GetOrgByIdUseCaseRequest): Promise<GetOrgByIdUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org,
    }
  }
}
