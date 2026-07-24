export class GeradorIdFixo {
  constructor(ids = ['id-fixo-001']) { this.ids = [...ids]; this.indice = 0; }
  gerar() {
    const id = this.ids[this.indice] ?? `id-fixo-${String(this.indice + 1).padStart(3,'0')}`;
    this.indice += 1;
    return id;
  }
}