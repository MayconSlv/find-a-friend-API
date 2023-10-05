import { Pet } from '@prisma/client'
import { PetRepository } from '../repository/pet-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FilterPetsByCharacteristicsUseCaseRequest {
  address: string
  species?: string
  size?: string
  age?: string
  gender?: string
}

interface FilterPetsByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsByCharacteristicsUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    age,
    gender,
    size,
    species,
    address,
  }: FilterPetsByCharacteristicsUseCaseRequest): Promise<FilterPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByFilter({
      address,
      age,
      gender,
      size,
      species,
    })

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
