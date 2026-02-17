# 🛠️ Admin Panel — Painel Administrativo Corporativo

Painel administrativo corporativo para **gestão de usuários**, desenvolvido com foco em **boas práticas de Front-end**, **arquitetura escalável** e **experiência do usuário**.

Este projeto simula um cenário real de aplicação corporativa, cobrindo **CRUD**, **tabelas**, **paginação**, **filtros**, **estados de interface** e **organização de código**.

---

## 🎯 Objetivo do Projeto

Demonstrar domínio em:

- Arquitetura Front-end escalável
- Componentização reutilizável
- Gerenciamento de estado assíncrono
- UX em aplicações administrativas
- Código limpo, tipado e organizado

Projeto desenvolvido **exclusivamente no Front-end**, utilizando **dados mockados**, simulando uma API real.

---

## 🧩 Funcionalidades

- 📊 Dashboard inicial com métricas simuladas
- 👥 Listagem de usuários em tabela
- ➕ Criação de usuários
- ✏️ Edição de usuários
- 🗑️ Remoção de usuários
- 🔍 Filtros por nome, email e status
- 📄 Paginação
- ⏳ Estados de loading, erro e vazio
- 📱 Layout responsivo
- ♿ Acessibilidade básica

---

## 🧪 Dados

- Dados mockados (sem backend real)
- Simulação de requisições com **React Query**
- Estrutura preparada para fácil integração com API real

---

## 🧱 Arquitetura de Pastas

```bash
src/
├── pages/        # Páginas da aplicação (rotas)
├── components/   # Componentes reutilizáveis
├── hooks/        # Hooks customizados
├── services/     # Camada de acesso a dados (API / mocks)
├── types/        # Tipagens TypeScript
├── utils/        # Funções utilitárias
└── styles/       # Estilos globais (se necessário)
