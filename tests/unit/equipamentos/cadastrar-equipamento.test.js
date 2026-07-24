import test from 'node:test';
import assert from 'node:assert/strict';
import { EquipamentoRepositoryMemoria } from '../../../modulos/equipamentos/infraestrutura/equipamento-repository-memoria.js';
import { GeradorIdFixo } from '../../../compartilhado/ids/gerador-id-fixo.js';
import { RelogioFixo } from '../../../compartilhado/relogio/relogio-fixo.js';
import { CadastrarEquipamento } from '../../../modulos/equipamentos/aplicacao/casos-de-uso/cadastrar-equipamento.js';
import { TipoEquipamento } from '../../../modulos/equipamentos/dominio/tipo-equipamento.js';

function montarCasoDeUso(ids = ['equipamentos-001']) {
    const repository = new EquipamentoRepositoryMemoria();
    const geradorId = new GeradorIdFixo(ids);
    const relogio = new RelogioFixo('2026-07-20T13:00:00.000Z');
    const casoDeUso = new CadastrarEquipamento(repository, geradorId, relogio);

    return { repository, casoDeUso };
}

test('Cadastra equipamento válido sem salvar', async () => {
    // Arrange: prepara dependências controladas para o teste.
    const { repository, casoDeUso } = montarCasoDeUso();

    // Act: executa o comportamento que será validado.
    const equipamento = await casoDeUso.executar({
        serviceTag: 'ABC1234',
        modelo: 'Latitude 7450',
        clienteId: 'cliente-001',
        tipo: TipoEquipamento.NOTEBOOK,
    });

    // Assert: compara o resultado obtido com o resultado esperado.
    assert.strictEqual(equipamento.id, 'equipamentos-001');
    assert.strictEqual(equipamento.serviceTag, 'ABC1234');
    assert.strictEqual(equipamento.modelo, 'Latitude 7450');
    assert.strictEqual(equipamento.clienteId, 'cliente-001');
    assert.strictEqual(equipamento.tipo, TipoEquipamento.NOTEBOOK);
    assert.strictEqual(equipamento.criadoEm.toISOString(), '2026-07-20T13:00:00.000Z');
});