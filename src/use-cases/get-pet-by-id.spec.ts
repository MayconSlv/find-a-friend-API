import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repository/in-memory/in-memory-org-repository'
import { InMemoryPetsRepository } from '../repository/in-memory/in-memory-pet-repository'
import { hash } from 'bcryptjs'
import { GetSpecificPetUseCase } from './get-pet-by-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgRepository: InMemoryOrgsRepository
let petRepository: InMemoryPetsRepository
let sut: GetSpecificPetUseCase

describe('Get Pet By Id Use Case', async () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new GetSpecificPetUseCase(petRepository)

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

  it('should be able to get a specific pet', async () => {
    const createdPet = await petRepository.create({
      age: 'YOUNG',
      breed: 'vira-lata',
      description: 'Javascript its a cat.',
      gender: 'FEMALE',
      name: 'javascript',
      org_id: 'javascript-org',
      size: 'SMALL',
      species: 'CAT',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('javascript')
  })

  it('should not be able to get a pet with wrong id', async () => {
    expect(
      async () =>
        await sut.execute({
          petId: 'no-existing-id',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
