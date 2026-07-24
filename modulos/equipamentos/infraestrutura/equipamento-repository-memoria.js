export class EquipamentoRepositoryMemoria {
    constructor() { this.porId=new Map(); this.idPorChave=new Map(); }
    async salvar(item){ this.porId.set(item.id,item); this.idPorChave.set(String(item.serviceTag).trim().toUpperCase(),item.id); return item; }
    async buscarPorId(id){ return this.porId.get(id) ?? null; }
    async listar(){ return [...this.porId.values()]; }
    async buscarPorChave(valor){ const id=this.idPorChave.get(String(valor??'').trim().toUpperCase()); return id ? this.porId.get(id) ?? null : null; }
}