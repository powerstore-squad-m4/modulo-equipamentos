import { DaoPostgresBase } from "../../../../compartilhado/banco/dao-postgres-base.js";
export class EquipamentoDaoPostgres extends DaoPostgresBase {

  async inserir(d) { return this.umaLinha(`INSERT INTO equipamentos(id,cliente_id,service_tag,tipo,modelo,ativo) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,[d.id,d.cliente_id,d.service_tag,d.tipo,d.modelo,d.ativo]); }
  async buscarPorId(id) { return this.umaLinha(`SELECT * FROM equipamentos WHERE id=$1`,[id]); }
  async buscarPorServiceTag(tag) { return this.umaLinha(`SELECT * FROM equipamentos WHERE service_tag=$1`,[tag]); }
  async listarPorCliente(clienteId) { return this.variasLinhas(`SELECT * FROM equipamentos WHERE cliente_id=$1 ORDER BY service_tag`,[clienteId]); }

}
