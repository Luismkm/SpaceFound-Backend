export class CnpjAlreadyRegisteredError extends Error {
  constructor() {
    super('The received cnpj is already registered');
    this.name = 'CnpjAlreadyRegisteredError';
  }
}
