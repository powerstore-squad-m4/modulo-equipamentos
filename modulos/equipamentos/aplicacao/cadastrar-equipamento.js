import { Equipamento } from '../../dominio/equipamento.js';
import { ErroConflito } from '../../../../compartilhado/erros/erro-conflito.js';
export class CadastrarEquipamento {
    constructor(repository,geradorId,relogio){ this.repository=repository; this.geradorId=geradorId; this.relogio=relogio; }
    async executar(dto){
        if(await this.repository.buscarPorChave(dto.serviceTag)) throw new ErroConflito('EQUIPAMENTO_JA_EXISTE', 'Registro duplicado.');
        const item=new Equipamento({ id:this.geradorId.gerar(), ...dto, criadoEm:this.relogio.agora() });
        await this.repository.salvar(item);
        return item;
    }
}