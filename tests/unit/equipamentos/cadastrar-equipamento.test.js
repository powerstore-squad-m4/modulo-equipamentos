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

    return casoDeUso;
}

test('Cadastra equipamento válido e salva no repositório', async () => {
    const casoDeUso = montarCasoDeUso();
    const entrada = {
        serviceTag: 'ABC1234',
        modelo: 'Latitude 7450',
        clienteId: 'cliente-001',
        tipo: TipoEquipamento.NOTEBOOK,
    };

    const equipamento = await casoDeUso.executar(entrada);

    assert.strictEqual(equipamento.id, 'equipamentos-001');
    assert.strictEqual(equipamento.serviceTag, entrada.serviceTag);
    assert.strictEqual(equipamento.modelo, entrada.modelo);
    assert.strictEqual(equipamento.clienteId, entrada.clienteId);
    assert.strictEqual(equipamento.tipo, entrada.tipo);
    assert.strictEqual(equipamento.criadoEm.toISOString(), '2026-07-20T13:00:00.000Z');

    // Verifica se o equipamento foi salvo corretamente no repositório
    const equipamentoSalvo = await casoDeUso.repository.buscarPorId('equipamentos-001');
    assert.deepStrictEqual(equipamentoSalvo, equipamento);
});

test('Lança erro ao tentar cadastrar equipamento com serviceTag duplicada', async () => {
    const casoDeUso = montarCasoDeUso();
    const entrada1 = {
        serviceTag: 'ABC1234',
        modelo: 'Latitude 7450',
        clienteId: 'cliente-001',
        tipo: TipoEquipamento.NOTEBOOK,
    };

    const entrada2 = {
        serviceTag: 'ABC1234', // mesma serviceTag do primeiro equipamento
        modelo: 'Latitude 7550',
        clienteId: 'cliente-002',
        tipo: TipoEquipamento.NOTEBOOK,
    };

    await casoDeUso.executar(entrada1);

    await assert.rejects(
        async () => {
            await casoDeUso.executar(entrada2);
        },
        erro => erro.codigo === 'EQUIPAMENTO_JA_EXISTE'
    );
});