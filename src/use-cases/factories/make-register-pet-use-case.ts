import { PrismaOrgRepository } from '@/repository/prisma/prisma-org-repository'
import { PrismaPetRepository } from '@/repository/prisma/prisma-pet-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const petRepository = new PrismaPetRepository()
  const registerPetUseCase = new RegisterPetUseCase(
    petRepository,
    orgRepository,
  )

  return registerPetUseCase
}
