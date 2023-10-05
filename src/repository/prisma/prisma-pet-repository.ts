import { Org, Prisma } from '@prisma/client'
import { FilterEnum, PetRepository } from '../pet-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findManyByOrgs(orgs: Org[]) {
    const orgArrId = orgs.map((item) => item.id)

    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgArrId,
        },
      },
    })

    return pets
  }

  async findManyByFilter({ address, age, gender, size, species }: FilterEnum) {
    const query: any = {}

    if (age) {
      query.age = age
    }

    if (gender) {
      query.gender = gender
    }

    if (size) {
      query.size = size
    }

    if (species) {
      query.species = species
    }

    const pets = await prisma.pet.findMany({
      where: {
        org: {
          address,
        },
        ...query,
      },
    })

    return pets
  }

  async findPetById(petId: string) {
    return await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })
  }
}
