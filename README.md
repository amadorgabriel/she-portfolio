# Karina Reis — Portfólio v2

Portfólio editorial de moda (placeholder brand **Karina Reis**), com conteúdo no Sanity CMS e front em Next.js App Router.

Referência de layout: clone estrutural Marina Catelli (`/`, `/menu`, `/c/[category]`, `/p/[slug]`).

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS 4
- **Sanity** (schemas `siteConfig`, `category`, `project`) + Studio embutido em `/studio`
- **Framer Motion** para motion editorial leve

## Setup local

```bash
npm install
cp .env.local.example .env.local
# Preencha NEXT_PUBLIC_SANITY_* e, para seed, SANITY_API_TOKEN (write)
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Studio: [http://localhost:3000/studio](http://localhost:3000/studio).

## Variáveis de ambiente

| Variável | Onde | Notas |
|----------|------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | local + Vercel | Obrigatório |
| `NEXT_PUBLIC_SANITY_DATASET` | local + Vercel | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | local + Vercel | ex. `2024-01-01` |
| `NEXT_PUBLIC_SITE_URL` | local + Vercel | URL canónica (`https://….vercel.app` por agora) |
| `SANITY_API_TOKEN` | **só local / CI seed** | Write — **não** no runtime Vercel |
| `SANITY_API_READ_TOKEN` | opcional local | Preview drafts |
| `SANITY_PREVIEW_SECRET` | opcional local | Preview mode |

Modelo: `.env.local.example`.

## Seed / higiene Sanity

```bash
npm run sanity:seed          # cria/atualiza docs v2 (idempotente)
npm run sanity:verify        # conta categorias/projetos + slugs
npm run sanity:purge         # dry-run: lista órfãos (about/contact / fora do seed)
npm run sanity:purge:apply   # apaga órfãos listados
```

Guia detalhado: `sanity/seed/README.md`.

## Rotas

| Rota | Conteúdo |
|------|----------|
| `/` | Splash + CTA |
| `/menu` | Lista de categorias |
| `/c/[category]` | Grid de projetos da categoria |
| `/p/[slug]` | Detalhe do projeto |
| `/studio` | Sanity Studio |

## Deploy (Vercel)

Decisões (change `002`): host **Vercel**, URL `*.vercel.app`, merge em **`main`**, envs só públicos Sanity + `NEXT_PUBLIC_SITE_URL`.

### Checklist

1. [ ] Login: `npx vercel login`
2. [ ] Na pasta do repo: `npx vercel link` (criar projeto ou ligar existente)
3. [ ] Envs de Production (e Preview se quiser):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01`
   - `NEXT_PUBLIC_SITE_URL=https://<projeto>.vercel.app` (atualizar após primeira URL)
4. [ ] Conectar o repo no dashboard Vercel com branch de produção = `main`
5. [ ] Merge `feat/v2-marina-clone` → `main` (PR) e aguardar deploy
6. [ ] Smoke: `/`, `/menu`, `/c/estilo`, `/p/floral`, `/studio`

CLI alternativa após login:

```bash
npx vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production
npx vercel env add NEXT_PUBLIC_SANITY_DATASET production
npx vercel env add NEXT_PUBLIC_SANITY_API_VERSION production
npx vercel env add NEXT_PUBLIC_SITE_URL production
npx vercel --prod
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run sanity:seed
npm run sanity:verify
npm run sanity:purge
```

## Branches

| Branch | Papel |
|--------|--------|
| `main` | Produção (Vercel) |
| `feat/v2-marina-clone` | Trabalho v2 / cleanup |
| `develop` | Snapshot Y2K congelado (não misturar na UI v2) |

## Notas

- Brand final do cliente substitui “Karina Reis” numa change futura.
- Y2K legado permanece só em `develop`.
