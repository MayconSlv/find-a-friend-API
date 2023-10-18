import { OrgRepository } from '@/repository/org-repository'
import { PetRepository } from '@/repository/pet-repository'
import { Age, Gender, Pet, Size, Species } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  breed: string
  species: Species
  age: Age
  size: Size
  gender: Gender
  org_id: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({
    age,
    breed,
    description,
    gender,
    name,
    org_id,
    size,
    species,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgRepository.findById(org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petRepository.create({
      age,
      breed,
      description,
      gender,
      name,
      org_id,
      size,
      species,
    })

    return {
      pet,
    }
  }
}
