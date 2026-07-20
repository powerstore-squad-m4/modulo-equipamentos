export class Equipamento {
    id;
    clienteId;
    serviceTag;
    tipo;
    modelo;
    ativo;

    constructor(id, clienteId, serviceTag, tipo, modelo, ativo) {
        // TODO: validar os dados do equipamento
        this.id = id
        this.clienteId = clienteId
        this.serviceTag = serviceTag
        this.tipo = tipo
        this.modelo = modelo
        this.ativo = ativo
    }

    ativar () {
        this.ativo = true
    }

    inativar () {
        this.ativo = false
    }

}
