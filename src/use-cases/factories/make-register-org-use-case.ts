import { PrismaOrgRepository } from '@/repository/prisma/prisma-org-repository'
import { RegisterOrgUseCase } from '../register-org'

export function makeRegisterOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(orgRepository)

  return registerOrgUseCase
}
