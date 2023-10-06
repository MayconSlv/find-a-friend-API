import { PrismaOrgRepository } from '@/repository/prisma/prisma-org-repository'
import { GetOrgByIdUseCase } from '../get-org-by-id'

export function makeGetOrgByIdUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const getOrgById = new GetOrgByIdUseCase(orgRepository)

  return getOrgById
}
