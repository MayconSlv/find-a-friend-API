import { Pet } from '@prisma/client'
import { PetRepository } from '../repository/pet-repository'

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
      throw new Error('Pet not found.')
    }

    return {
      pet,
    }
  }
}
