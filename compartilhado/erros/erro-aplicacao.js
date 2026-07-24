export class ErroAplicacao extends Error {
  constructor(codigo, mensagem, detalhes) {
    super(mensagem);
    this.name = this.constructor.name;
    this.codigo = codigo;
    this.detalhes = detalhes;
  }
}