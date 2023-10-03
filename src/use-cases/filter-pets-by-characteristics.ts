import { Pet } from '@prisma/client'
import { PetRepository, FilterEnum } from '../repository/pet-repository'

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
      throw new Error('Pets not found.')
    }

    return {
      pets,
    }
  }
}
