import { Pet } from '@prisma/client'
import { PetRepository } from '../repository/pet-repository'
import { OrgRepository } from '@/repository/org-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetsUseCaseRequest {
  address: string
}

interface GetPetsUseCaseResponse {
  pets: Pet[]
}

export class GetPetsUseCase {
  constructor(
    private petsRepository: PetRepository,
    private orgsRepository: OrgRepository,
  ) {}

  async execute({
    address,
  }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const orgs = await this.orgsRepository.fetchByCity(address)

    if (!orgs) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyByOrgs(orgs)

    return {
      pets,
    }
  }
}
