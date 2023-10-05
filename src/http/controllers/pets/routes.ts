import { FastifyInstance } from 'fastify'
import { pets } from './pets'
import { filter } from './filter'
import { specificPet } from './specific-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/:address/pets', pets)
  app.get('/:address/pets/filter', filter)
  app.get('/:address/pets/:id', specificPet)
}
