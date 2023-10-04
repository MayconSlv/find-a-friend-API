import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryOrgsRepository } from '../repository/in-memory/in-memory-org-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', async () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgRepository)
  })

  it('should be able to authenticate', async () => {
    await orgRepository.create({
      address: 'Javascript Street',
      cep: '11111111',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      phone: '11 11111-1111',
    })

    const { organization } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgRepository.create({
      address: 'Javascript Street',
      cep: '11111111',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      phone: '11 11111-1111',
    })

    expect(() =>
      sut.execute({
        email: 'wrong@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgRepository.create({
      address: 'Javascript Street',
      cep: '11111111',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      phone: '11 11111-1111',
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
