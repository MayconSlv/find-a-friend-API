import { PrismaPetRepository } from '@/repository/prisma/prisma-pet-repository'
import { GetSpecificPetUseCase } from '../get-pet-by-id'

export function makeGetPetByIdUseCase() {
  const petRepository = new PrismaPetRepository()
  const getPetByIdUseCase = new GetSpecificPetUseCase(petRepository)

  return getPetByIdUseCase
}
