import pkg from "pg";

const { Client } = pkg;

export class DaoPostgresBase {
  constructor({ connectionString = process.env.DATABASE_URL, ...options } = {}) {
    if (!connectionString) {
      throw new Error("Defina DATABASE_URL ou passe connectionString para o DAO Postgres.");
    }

    this.client = new Client({ connectionString, ...options });
    this.conectado = false;
  }

  async conectar() {
    if (!this.conectado) {
      await this.client.connect();
      this.conectado = true;
    }
  }

  async desconectar() {
    if (this.conectado) {
      await this.client.end();
      this.conectado = false;
    }
  }

  async umaLinha(query, params = []) {
    await this.conectar();
    const resultado = await this.client.query(query, params);
    return resultado.rows[0] ?? null;
  }

  async variasLinhas(query, params = []) {
    await this.conectar();
    const resultado = await this.client.query(query, params);
    return resultado.rows;
  }

  async executar(query, params = []) {
    await this.conectar();
    return this.client.query(query, params);
  }

  async testarConexao() {
    await this.conectar();
    const resultado = await this.client.query("SELECT NOW() as agora");
    return resultado.rows[0];
  }
}
