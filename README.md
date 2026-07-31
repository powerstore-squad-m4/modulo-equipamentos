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
|     |    |-- equipamento-repository-memoria.js
|     |    |-- postgres/
|     |    |    |-- equipamento.dao.postgres.js
|     |    |    |-- equipamento.mapper.js
|     |    |    |-- equipamento.repository.postgres.js
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
|          |-- testar-conexao-postgres.js
|
|-- compartilhado/
|     |-- banco/
|     |    |-- dao-postgres-base.js
|     |-- erros/
|     |-- ids/
|     |-- normalizacao/
|     |-- relogio/
|
|-- README.md
|-- DECISOES.md
|-- package.json
```

## Persistência com PostgreSQL

### Estrutura do Banco de Dados

**Tabela: equipamentos**

| Campo | Tipo | Constraint | Descrição |
|-------|------|------------|-----------|
| id | VARCHAR(50) | PRIMARY KEY | Identificador único do equipamento |
| cliente_id | VARCHAR(50) | NOT NULL | ID do cliente proprietário |
| service_tag | VARCHAR(50) | UNIQUE, NOT NULL | Service Tag única do equipamento |
| tipo | VARCHAR(50) | NOT NULL | Tipo do equipamento |
| modelo | VARCHAR(100) | - | Modelo do equipamento |
| ativo | BOOLEAN | DEFAULT true | Status do equipamento |
| criado_em | TIMESTAMPTZ | DEFAULT NOW() | Data de cadastro |

**Índices:**
- `idx_equipamentos_cliente_id` - Consultas por cliente
- `idx_equipamentos_service_tag` - Validação de unicidade e busca
- `idx_equipamentos_ativo` - Filtragem por status

### Componentes da Persistência

#### 1. DAO (Data Access Object)
**Arquivo:** `modulos/equipamentos/infraestrutura/postgres/equipamento.dao.postgres.js`

**Responsabilidade:** Executar operações SQL no PostgreSQL
- `inserir(d)` - INSERT com RETURNING
- `buscarPorId(id)` - SELECT por ID
- `buscarPorServiceTag(tag)` - SELECT por Service Tag
- `listarPorCliente(clienteId)` - SELECT filtrado por cliente

#### 2. Mapper
**Arquivo:** `modulos/equipamentos/infraestrutura/postgres/equipamento.mapper.js`

**Responsabilidade:** Converter entre domínio e persistência
- `paraDominio(row)` - Converte row do banco para entidade Equipamento
- `paraPersistencia(entity)` - Converte entidade para formato do banco (snake_case)

#### 3. Repository PostgreSQL
**Arquivo:** `modulos/equipamentos/infraestrutura/postgres/equipamento.repository.postgres.js`

**Responsabilidade:** Implementar o contrato do repository usando PostgreSQL
- `salvar(e)` - Usa Mapper + DAO.inserir
- `buscarPorId(id)` - Usa DAO.buscarPorId + Mapper
- `buscarPorServiceTag(t)` - Usa DAO.buscarPorServiceTag + Mapper
- `listarPorCliente(id)` - Usa DAO.listarPorCliente + Mapper

### Fluxo de Dados

**Gravação (DTO → PostgreSQL):**
```
DTO (entrada)
  ↓
Caso de Uso (CadastrarEquipamento)
  ↓ validações de negócio
Entidade Equipamento (domínio)
  ↓
Repository (salvar)
  ↓ Mapper.paraPersistencia
DAO (inserir)
  ↓ SQL
PostgreSQL
```

**Consulta (PostgreSQL → Entidade):**
```
PostgreSQL
  ↓ SQL
DAO (buscarPorId)
  ↓ row
Mapper.paraDominio
  ↓
Repository (buscarPorId)
  ↓
Caso de Uso
  ↓
Entidade Equipamento (domínio)
```

### Validações Implementadas

**Backend (Caso de Uso):**
- Service Tag obrigatória
- Service Tag única (verifica no repository)
- Cliente deve existir e estar ativo
- Tipo de equipamento válido

**Banco de Dados (Constraints):**
- `service_tag UNIQUE` - Garante unicidade no nível do banco
- `cliente_id NOT NULL` - Garante cliente obrigatório
- `tipo NOT NULL` - Garante tipo obrigatório