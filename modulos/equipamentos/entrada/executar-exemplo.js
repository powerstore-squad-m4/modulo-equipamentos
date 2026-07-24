import { EquipamentoRepositoryMemoria } from '../infraestrutura/equipamento-repository-memoria.js';
import { CadastrarEquipamento } from '../aplicacao/casos-de-uso/cadastrar-equipamento.js';
import { GeradorIdFixo } from '../../../compartilhado/ids/gerador-id-fixo.js';
import { RelogioFixo } from '../../../compartilhado/relogio/relogio-fixo.js';
import { TipoEquipamento } from '../dominio/tipo-equipamento.js';
const repository=new EquipamentoRepositoryMemoria();
const caso=new CadastrarEquipamento(repository,new GeradorIdFixo(['equipamentos-001']),new RelogioFixo());
console.log('\n[EQUIPAMENTOS]',await caso.executar({ serviceTag:'ABC1234', modelo:'Latitude 7450', clienteId:'cliente-001', tipo: TipoEquipamento.NOTEBOOK }));
