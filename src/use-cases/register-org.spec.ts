import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repository/in-memory/in-memory-org-repository'
import { RegisterOrgUseCase } from './register-org'
import { OrganizationWithSameEmailExistsError } from './errors/organziation-with-same-email-error'
import { compare } from 'bcryptjs'

let orgRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Organization Use Case', async () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgRepository)
  })

  it('should be able to register a organization', async () => {
    const { org } = await sut.execute({
      address: 'Javascript Street',
      cep: '11111111',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      phone: '11 11111-1111',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      address: 'Javascript Street',
      cep: '11111111',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      phone: '11 11111-1111',
    })

    expect(
      async () =>
        await sut.execute({
          address: 'Javascript Street',
          cep: '11111111',
          email: 'johndoe@example.com',
          name: 'John Doe',
          password: '123456',
          phone: '11 11111-1111',
        }),
    ).rejects.toBeInstanceOf(OrganizationWithSameEmailExistsError)
  })

  it('should be hash a organization password upon registration', async () => {
    const { org } = await sut.execute({
      address: 'Javascript Street',
      cep: '11111111',
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      phone: '11 11111-1111',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
