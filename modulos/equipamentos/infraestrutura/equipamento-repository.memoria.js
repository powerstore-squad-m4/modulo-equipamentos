export class EquipamentoRepositoryMemoria {
  #porId = new Map();
  #idPorTag = new Map();

  async salvar(equipamento) {
    this.#porId.set(equipamento.id, equipamento);
    this.#idPorTag.set(equipamento.serviceTag, equipamento.id);
    return equipamento;
  }
  async buscarPorId(id) { return this.#porId.get(id) ?? null; }
  async buscarPorServiceTag(tag) {
    const id = this.#idPorTag.get(tag);
    return id ? this.#porId.get(id) ?? null : null;
  }
  async listarPorCliente(clienteId) {
    return [...this.#porId.values()].filter((e) => e.clienteId === clienteId);
  }
}
