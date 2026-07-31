import test from "node:test";
import assert from "node:assert/strict";
import { CadastrarEquipamento } from "../../../src/modulos/equipamentos/aplicacao/cadastrar-equipamento.js";
import { EquipamentoRepositoryMemoria } from "../../../src/modulos/equipamentos/infraestrutura/equipamento-repository.memoria.js";
import { ClienteConsultaDouble } from "../../doubles/cliente-consulta.double.js";

test("impede Service Tag duplicada", async () => {
  const repository = new EquipamentoRepositoryMemoria();
  const caso = new CadastrarEquipamento({ equipamentoRepository: repository, clienteConsulta: new ClienteConsultaDouble([{ id: "c1", ativo: true }]), geradorId: { gerar: () => "e1" } });
  await caso.executar({ clienteId: "c1", serviceTag: "TAG-1", tipo: "NOTEBOOK" });
  await assert.rejects(() => caso.executar({ clienteId: "c1", serviceTag: " tag-1 ", tipo: "NOTEBOOK" }), e => e.codigo === "EQUIPAMENTO_JA_EXISTE");
});

test("impede cadastro para cliente inativo ou inexistente", async () => {
  const caso = new CadastrarEquipamento({ equipamentoRepository: new EquipamentoRepositoryMemoria(), clienteConsulta: new ClienteConsultaDouble([]), geradorId: { gerar: () => "e1" } });
  await assert.rejects(() => caso.executar({ clienteId: "c1", serviceTag: "TAG-1", tipo: "NOTEBOOK" }), e => e.codigo === "CLIENTE_NAO_ENCONTRADO");
});
