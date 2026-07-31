export class EquipamentoConsultaAdapter {
  constructor({ equipamentoRepository }) {
    this.equipamentoRepository = equipamentoRepository;
  }

  async consultarAtivo(id) {
    const equipamento = await this.equipamentoRepository.buscarPorId(id);
    return equipamento && equipamento.ativo ? { ...equipamento } : null;
  }

  async pertenceAoCliente(id, clienteId) {
    const equipamento = await this.equipamentoRepository.buscarPorId(id);
    return Boolean(equipamento && equipamento.ativo && equipamento.clienteId === clienteId);
  }
}
