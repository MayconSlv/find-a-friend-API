import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repository/in-memory/in-memory-org-repository'
import { InMemoryPetsRepository } from '../repository/in-memory/in-memory-pet-repository'
import { RegisterPetUseCase } from './register-pet'
import { hash } from 'bcryptjs'

let orgRepository: InMemoryOrgsRepository
let petRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', async () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petRepository, orgRepository)

    await orgRepository.create({
      address: 'Javascript Street',
      cep: '11111111',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      phone: '11 11111-1111',
      id: 'org-01',
    })
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      age: 'YOUNG',
      breed: 'vira-lata',
      description: 'Javascript its a cat.',
      gender: 'FEMALE',
      name: 'javascript',
      org_id: 'org-01',
      size: 'SMALL',
      species: 'CAT',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
