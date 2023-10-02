import { Org, Prisma } from '@prisma/client'
import { OrgRepository } from '../org-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      address: data.address,
      phone: data.phone,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = await this.items.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = await this.items.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
