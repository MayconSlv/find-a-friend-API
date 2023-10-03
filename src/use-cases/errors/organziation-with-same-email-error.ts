export class OrganizationWithSameEmailExistsError extends Error {
  constructor() {
    super('Organization already exists with same email.')
  }
}
