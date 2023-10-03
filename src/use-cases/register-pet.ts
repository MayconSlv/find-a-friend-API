import { Pet, Species, Age, Gender, Size } from '@prisma/client'
import { PetRepository } from '../repository/pet-repository'
import { OrgRepository } from '@/repository/org-repository'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  species: Species
  breed: string
  size: Size
  age: Age
  gender: Gender
  org_id: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetRepository,
    private orgsRepository: OrgRepository,
  ) {}

  async execute({
    name,
    description,
    species,
    breed,
    size,
    age,
    gender,
    org_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (org) {
      throw new Error('Organization not found.')
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      species,
      breed,
      size,
      age,
      gender,
      org_id,
    })

    return {
      pet,
    }
  }
}
