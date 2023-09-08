export class ValidationError extends Error {
  constructor() {
    super('Some data does not comply with the rules.')
  }
}