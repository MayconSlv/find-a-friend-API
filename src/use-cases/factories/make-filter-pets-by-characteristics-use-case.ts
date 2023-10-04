import { PrismaPetRepository } from '@/repository/prisma/prisma-pet-repository'
import { FilterPetsByCharacteristicsUseCase } from '../filter-pets-by-characteristics'

export function makeFilterPetsByCharacteristicsUseCase() {
  const petRepository = new PrismaPetRepository()
  const filterPetsByCharacteristicsUseCase =
    new FilterPetsByCharacteristicsUseCase(petRepository)

  return filterPetsByCharacteristicsUseCase
}
