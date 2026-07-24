export class RelogioFixo {
  constructor(dataIso='2026-07-20T13:00:00.000Z') { this.data = new Date(dataIso); }
  agora() { return new Date(this.data); }
  avancarMilissegundos(valor) { this.data = new Date(this.data.getTime() + valor); }
}