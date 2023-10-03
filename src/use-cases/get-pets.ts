import { Pet } from '@prisma/client'
import { PetRepository } from '../repository/pet-repository'
import { OrgRepository } from '@/repository/org-repository'

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
      throw new Error('Organizations not found.')
    }

    const pets = await this.petsRepository.findManyByOrgs(orgs)

    return {
      pets,
    }
  }
}
