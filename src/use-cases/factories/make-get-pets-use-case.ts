import { PrismaOrgRepository } from '@/repository/prisma/prisma-org-repository'
import { PrismaPetRepository } from '@/repository/prisma/prisma-pet-repository'
import { GetPetsUseCase } from '../get-pets'

export function makeGetPetsUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const petRepository = new PrismaPetRepository()
  const getPetsUseCase = new GetPetsUseCase(petRepository, orgRepository)

  return getPetsUseCase
}
