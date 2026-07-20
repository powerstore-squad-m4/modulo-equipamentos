export class ClienteConsultaDouble {
    constructor({clientesAtivos =[]} = {}) {
        this.clientesAtivos = new Set(clientesAtivos);
    }
    async constultarAtivo(clienteId) {
        return {
            id: clienteId,
            ativo: this.clientesAtivos.has(clienteId)
        };
    }
}