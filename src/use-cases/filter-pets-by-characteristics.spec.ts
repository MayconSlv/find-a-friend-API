import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repository/in-memory/in-memory-org-repository'
import { InMemoryPetsRepository } from '../repository/in-memory/in-memory-pet-repository'
import { hash } from 'bcryptjs'
import { FilterPetsByCharacteristicsUseCase } from './filter-pets-by-characteristics'

let orgRepository: InMemoryOrgsRepository
let petRepository: InMemoryPetsRepository
let sut: FilterPetsByCharacteristicsUseCase

describe('Filter Pets By Characteristics Use Case', async () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new FilterPetsByCharacteristicsUseCase(petRepository)

    await orgRepository.create({
      address: 'Javascript City',
      cep: '11111111',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      phone: '11 11111-1111',
      id: 'javascript-org',
    })
  })

  it('should be able to filter pets by characteristics', async () => {
    await petRepository.create({
      age: 'YOUNG',
      breed: 'vira-lata',
      description: 'Javascript its a cat.',
      gender: 'FEMALE',
      name: 'javascript',
      org_id: 'javascript-org',
      size: 'SMALL',
      species: 'CAT',
    })

    await petRepository.create({
      age: 'YOUNG',
      breed: 'vira-lata',
      description: 'Javascript its a cat.',
      gender: 'FEMALE',
      name: 'Rex',
      org_id: 'javascript-org',
      size: 'MEDIUM',
      species: 'DOG',
    })

    const query = {
      species: 'CAT',
      size: 'SMALL',
    }

    const { pets } = await sut.execute(query)

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'javascript' })])
  })
})
