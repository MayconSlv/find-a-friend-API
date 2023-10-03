import { Pet } from '@prisma/client'
import { PetRepository, FilterEnum } from '../repository/pet-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FilterPetsByCharacteristicsUseCaseRequest {
  query: FilterEnum
}

interface FilterPetsByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsByCharacteristicsUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    query,
  }: FilterPetsByCharacteristicsUseCaseRequest): Promise<FilterPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.findByFilter(query)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
