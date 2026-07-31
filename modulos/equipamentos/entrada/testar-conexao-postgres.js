import { EquipamentoDaoPostgres } from '../infraestrutura/postgres/equipamento.dao.postgres.js';

const dao = new EquipamentoDaoPostgres();

try {
  const resultado = await dao.testarConexao();
  console.log('[POSTGRES] Conexão OK:', resultado.agora);
} catch (erro) {
  console.error('[POSTGRES] Falha ao conectar:', erro.message);
  process.exitCode = 1;
} finally {
  await dao.desconectar();
}
