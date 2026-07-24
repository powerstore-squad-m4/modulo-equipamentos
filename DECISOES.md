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
ports/
infraestrutura/
aplicacao/
entrada/
```

### Decisões técnicas
- Node.js com ES Modules.
- Sem Express, HTTP, banco, ORM ou frontend.
- Repositories em memória com `Map`.
- Erros, IDs, relógio e normalização ficam em `modulo-equipamentos/compartilhado`.