export class Equipamento {
    id;
    clienteId;
    serviceTag;
    tipo;
    modelo;
    ativo;

    constructor(id, clienteId, serviceTag, tipo, modelo, ativo) {
        // Dúvida: devemos validar os dados do equipamento aqui ou em outro lugar? 
        // Por exemplo, validar se o serviceTag é único, se o tipo e modelo são válidos, etc.
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
