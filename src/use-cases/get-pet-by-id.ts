import { Pet } from '@prisma/client'
import { PetRepository } from '../repository/pet-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetsUseCaseRequest {
  petId: string
}

interface GetPetsUseCaseResponse {
  pet: Pet
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    petId,
  }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const pet = await this.petsRepository.findPetById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
