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
modulo-equipamentos/
|-- modulos/equipamentos/
|     |-- dominio/
|     |    |-- equipamento.js
|     |    |-- tipo-equipamento.js
|     |
|     |-- infraestrutura/
|     |    |-- equipamento-repository-memoris.js
|     |    |-- doubles/
|     |         |-- cliente-consulta.double.js
|     |
|     |-- aplicacao/
|     |    |-- casos-de-uso/
|     |    |    |-- cadastrar-equipamento.js
|     |    |-- ports/
|     |         |-- cliente-consulta.port.js
|     |         |-- equipamento-repository-port.js
|     |
|     |-- entrada/
|          |-- executar-exemplo.js
|
|-- README.md
|-- DECISOES.md