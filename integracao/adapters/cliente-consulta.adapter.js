export class ClienteConsultaAdapter {
  constructor({ clienteRepository }) {
    this.clienteRepository = clienteRepository;
  }

  async consultarAtivo(clienteId) {
    const cliente = await this.clienteRepository.buscarPorId(clienteId);
    return cliente && cliente.ativo
      ? { id: cliente.id, cnpj: cliente.cnpj, ativo: true }
      : null;
  }
}
