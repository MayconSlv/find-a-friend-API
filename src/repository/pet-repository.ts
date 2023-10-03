import { Org, Pet, Prisma } from '@prisma/client'

export interface FilterEnum {
  species?: string
  size?: string
  age?: string
  gender?: string
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetById(petId: string): Promise<Pet | null>
  findManyByOrgs(orgs: Org[]): Promise<Pet[]>
  findByFilter(filter: FilterEnum): Promise<Pet[] | null>
}
