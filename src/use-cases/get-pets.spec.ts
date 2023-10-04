import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repository/in-memory/in-memory-org-repository'
import { InMemoryPetsRepository } from '../repository/in-memory/in-memory-pet-repository'
import { hash } from 'bcryptjs'
import { GetPetsUseCase } from './get-pets'

let orgRepository: InMemoryOrgsRepository
let petRepository: InMemoryPetsRepository
let sut: GetPetsUseCase

describe('Get Pets Use Case', async () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new GetPetsUseCase(petRepository, orgRepository)

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

  it('should be able to get many pets of a specific city', async () => {
    for (let i = 1; i <= 10; i++) {
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
    }

    const { pets } = await sut.execute({
      address: 'Javascript City',
    })

    expect(pets.length).toEqual(10)
  })

  it('should not be able to get pets of a differente city', async () => {
    for (let i = 1; i <= 10; i++) {
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
    }

    const { pets } = await sut.execute({
      address: 'Typecript City',
    })

    expect(pets.length).toEqual(0)
  })
})
