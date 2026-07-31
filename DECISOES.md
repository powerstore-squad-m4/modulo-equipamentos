# Decisões - Módulo de Equipamentos

Este documento registra as principais decisões técnicas e de arquitetura adotadas durante a implementação do módulo de Equipamentos.

## 1. Arquitetura em Monólito Modular

### Decisão

O projeto será desenvolvido utilizando uma arquitetura de monólito modular.

Cada módulo possui responsabilidades bem definidas e deve manter baixo acoplamento com os demais módulos.

---

## 2. Organização em Camadas

### Decisão

Os módulos do projeto seguem uma separação de responsabilidades baseada nas seguintes camadas: 

```text
dominio/
infraestrutura/
aplicacao/
entrada/
```

### Decisões técnicas
- Node.js com ES Modules.
- Sem Express, HTTP, banco, ORM ou frontend.
- Repositories em memória com `Map`.
- Erros, IDs, relógio e normalização ficam em `modulo-equipamentos/compartilhado`.

---

## 3. Estratégia de Persistência

### Decisão

Adotar persistência durável com PostgreSQL mantendo o contrato do repository.

### Justificativa

O repository em memória continua disponível para testes rápidos, enquanto o Repository PostgreSQL oferece persistência durável por trás do mesmo contrato definido na porta (port).

### Componentes

**DAO (Data Access Object):**
- Responsável exclusivamente por executar operações SQL
- Localizado em `infraestrutura/postgres/*.dao.postgres.js`
- Herda de `DaoPostgresBase` para conexão e queries
- Não contém regras de negócio

**Mapper:**
- Responsável por converter entre formatos (domínio ↔ persistência)
- Localizado em `infraestrutura/postgres/*.mapper.js`
- Transforma camelCase (JavaScript) para snake_case (PostgreSQL)
- Métodos estáticos `paraDominio()` e `paraPersistencia()`

**Repository PostgreSQL:**
- Implementa o contrato definido no port
- Localizado em `infraestrutura/postgres/*.repository.postgres.js`
- Orquestra Mapper + DAO
- Retorna entidades do domínio, nunca dados crus do banco

### Separação de Responsabilidades

- **Caso de Uso:** Regras de negócio e orquestração
- **Repository:** Contrato de persistência (interface)
- **Mapper:** Tradução de formatos
- **DAO:** Execução de SQL
- **PostgreSQL:** Constraints e armazenamento

### Vantagens

- Testabilidade: Repository em memória para testes unitários
- Manutenibilidade: SQL isolado no DAO
- Flexibilidade: Fácil troca de implementação de persistência
- Performance: Índices e constraints no banco de dados