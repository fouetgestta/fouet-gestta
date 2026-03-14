# Fouet Gestta — ERP para Confeitarias 🧁

Sistema ERP web completo para gestão de confeitarias no Brasil, com PDV de alta performance, gestão completa e integração NFC-e SEFAZ-ES.

## Stack Tecnológica

| Layer | Tecnologia |
|---|---|
| Frontend | React 19 + Vite + TypeScript + Tailwind CSS v4 |
| Backend | Fastify + Prisma + TypeScript |
| Banco | PostgreSQL (Supabase) |
| Auth | Supabase Auth |
| NFC-e | Focus NFe API |
| Deploy | Netlify (frontend) + Render (backend) |

## Módulos

- **PDV** — Venda rápida com carrinho e categorias
- **Pedidos** — Kanban 4 colunas (iFood, Uber Eats, Balcão, Delivery)
- **Catálogo** — Ficha técnica + precificação automática com margem
- **Estoque** — Insumos, alertas, entrada de faturas
- **Financeiro** — Fluxo de caixa, lucratividade, contas a pagar/receber
- **Funcionários** — Cadastro, permissões, payroll integrado
- **Configurações** — Empresa, fiscal NFC-e, certificado A1

## Quick Start

```bash
# Frontend
cd frontend
npm install --legacy-peer-deps
npm run dev

# Backend
cd backend
npm install
npm run dev
```

## Conta Demo

```
Email: helderkock2008@gmail.com
Senha: fouetgestta@1
```

## License

© 2024 GOiN HUB. All rights reserved.
