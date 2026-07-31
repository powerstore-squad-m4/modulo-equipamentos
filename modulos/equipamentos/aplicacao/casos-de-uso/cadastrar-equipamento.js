import { Equipamento } from "../dominio/equipamento.js";
import { ErroAplicacao } from "../../../compartilhado/erros/erro-aplicacao.js";
import { normalizarCodigo } from "../../../compartilhado/normalizacao/normalizar-texto.js";

export class CadastrarEquipamento {
  constructor({ equipamentoRepository, clienteConsulta, geradorId }) {
    this.equipamentoRepository = equipamentoRepository;
    this.clienteConsulta = clienteConsulta;
    this.geradorId = geradorId;
  }

  async executar(entrada) {
    const cliente = await this.clienteConsulta.consultarAtivo(entrada.clienteId);
    if (!cliente) throw new ErroAplicacao("CLIENTE_NAO_ENCONTRADO", "Cliente ativo não encontrado.");

    const tag = normalizarCodigo(entrada.serviceTag);
    if (await this.equipamentoRepository.buscarPorServiceTag(tag)) {
      throw new ErroAplicacao("EQUIPAMENTO_JA_EXISTE", "Service Tag já cadastrada.");
    }

    const equipamento = new Equipamento({
      id: this.geradorId.gerar(),
      ...entrada,
      serviceTag: tag,
      ativo: true
    });
    return this.equipamentoRepository.salvar(equipamento);
  }
}
