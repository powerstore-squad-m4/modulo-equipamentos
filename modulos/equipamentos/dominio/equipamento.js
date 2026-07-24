import { ErroValidacao } from '../../../compartilhado/erros/erro-validacao.js'
import { TipoEquipamento } from './tipo-equipamento.js';

export class Equipamento {
    id;
    clienteId;
    serviceTag;
    tipo;
    modelo;
    ativo;

    constructor(d) {
        this.id = d.id;
        this.criadoEm = new Date(d.criadoEm);
        const tag = String(d.serviceTag ?? '').trim().toUpperCase();

        if(!tag) {
            throw new ErroValidacao('SERVICE_TAG_OBRIGATORIA', 'Service Tag obrigatória.');
        }
        if(!d.clienteId) {
            throw new ErroValidacao('CLIENTE_OBRIGATORIO', 'Cliente obrigatório.');
        }
        if(!d.tipo) {
            throw new ErroValidacao('TIPO_EQUIPAMENTO_INVALIDO', 'Tipo de equipamento obrigatório.');
        }
        if (!Object.values(TipoEquipamento).includes(d.tipo)) {
            throw new ErroValidacao('TIPO_EQUIPAMENTO_INVALIDO', 'Tipo de equipamento inválido.');
        }

        this.serviceTag = tag;
        this.modelo = String(d.modelo ?? '').trim();
        this.clienteId = d.clienteId;
        this.tipo = d.tipo;
        this.ativo = true;
        
    }

    ativar () {
        this.ativo = true
    }

    inativar () {
        this.ativo = false
    }

}