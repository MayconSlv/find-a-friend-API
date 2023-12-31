import { Pet } from '@prisma/client'
import { PetRepository } from '../repository/pet-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetSpecificPetUseCaseRequest {
  petId: string
}

interface GetSpecificPetUseCaseResponse {
  pet: Pet
}

export class GetSpecificPetUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    petId,
  }: GetSpecificPetUseCaseRequest): Promise<GetSpecificPetUseCaseResponse> {
    const pet = await this.petsRepository.findPetById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
