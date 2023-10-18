import { Org, Pet, Prisma } from '@prisma/client'

export interface FilterEnum {
  address: string
  age?: string
  gender?: string
  size?: string
  species?: string
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetById(petId: string): Promise<Pet | null>
  findManyByOrgs(orgs: Org[]): Promise<Pet[]>
  findManyByFilter(filter: FilterEnum): Promise<Pet[] | null>
}
