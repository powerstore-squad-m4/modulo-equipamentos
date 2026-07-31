import { Equipamento } from "../../dominio/equipamento.js";
export class EquipamentoMapper {
  static paraDominio(row) {
    if (!row) return null;
    return new Equipamento({
      id: row.id,
      clienteId: row.cliente_id,
      serviceTag: row.service_tag,
      tipo: row.tipo,
      modelo: row.modelo,
      ativo: row.ativo
    });
  }
  static paraPersistencia(entity) {
    return {
      id: entity.id,
      cliente_id: entity.clienteId,
      service_tag: entity.serviceTag,
      tipo: entity.tipo,
      modelo: entity.modelo,
      ativo: entity.ativo
    };
  }
}
