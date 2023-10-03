import { Org, Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepository, filterEnum } from '../pet-repository'

export class InMemoryPetsRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      breed: data.breed,
      description: data.description,
      gender: data.gender,
      size: data.size,
      species: data.species,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findManyByOrgs(orgs: Org[]) {
    const orgsArrId = orgs.map((item) => item.id)

    return this.items.filter((item) => orgsArrId.includes(item.org_id))
  }

  async findByFilter({ age, gender, size, species }: filterEnum) {
    let filteredPets = this.items

    if (age) {
      filteredPets = filteredPets.filter((item) => item.age === age)
    }

    if (gender) {
      filteredPets = filteredPets.filter((item) => item.gender === gender)
    }

    if (size) {
      filteredPets = filteredPets.filter((item) => item.size === size)
    }

    if (species) {
      filteredPets = filteredPets.filter((item) => item.species === species)
    }

    return filteredPets
  }
}
