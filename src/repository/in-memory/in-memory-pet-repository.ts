import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepository } from '../pet-repository'

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
}
