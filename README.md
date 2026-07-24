# modulo-equipamentos

## Descrição

O módulo de Equipamentos é responsável pelo gerenciamento dos equipamentos vinculados aos clientes da aplicação.

O módulo permite cadastrar equipamentos, garantindo que as principais regras de negócio sejam respeitadas, como:

- A Service Tag deve ser obrigatória.
- A Service Tag deve ser única.
- O cliente deve existir e estar ativo.
- O tipo do equipamento deve ser válido.
- Todo equipamento cadastrado inicia como ativo.
- Equipamentos podem ser inativados, preservando seu histórico.

## Estrutura do Módulo

```text
equipamento/
|-- modulos/
|     |-- dominio/
|     |    |-- equipamento.js
|     |
|     |-- ports/
|     |    |-- cliente-consulta.port.js
|     |
|     |-- infraestrutura/
|     |    |-- equipamento.repository.memory.js
|     |    |-- doubles/
|     |         |-- cliente-consulta.double.js
|     |
|     |-- aplicacao/
|     |    |-- cadastrar-equipamento.js
|     |
|     |-- entrada/
|          |-- executar-exemplo.js
|-- README.md
|-- DECISOES.md