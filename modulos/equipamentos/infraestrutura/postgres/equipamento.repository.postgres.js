import { EquipamentoMapper as M } from "./equipamento.mapper.js";
export class EquipamentoRepositoryPostgres {
  constructor(dao) { this.dao=dao; }

  async salvar(e){return M.paraDominio(await this.dao.inserir(M.paraPersistencia(e)));}
  async buscarPorId(id){return M.paraDominio(await this.dao.buscarPorId(id));}
  async buscarPorServiceTag(t){return M.paraDominio(await this.dao.buscarPorServiceTag(t));}
  async listarPorCliente(id){return (await this.dao.listarPorCliente(id)).map(M.paraDominio);}

}
