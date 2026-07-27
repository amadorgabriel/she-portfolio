# Seed Sanity — Portfólio v2 (Karina Reis)

Guia para popular o dataset com a estrutura da referência Marina Catelli e a marca placeholder **Karina Reis**.

## Pré-requisitos

1. Variáveis `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` configuradas
2. Token de **escrita** `SANITY_API_TOKEN` (Editor ou Admin) em `.env.local`  
   — `SANITY_API_READ_TOKEN` (Viewer) **não** basta para o seed
3. Studio em `/studio` opcional para revisão visual após o seed

## Seed automático (recomendado)

```bash
# 1. Crie um token Editor em https://www.sanity.io/manage → API → Tokens
# 2. Adicione em .env.local:
#    SANITY_API_TOKEN=sk...

npm run sanity:seed
```

O script `sanity/seed/seed.mjs` é **idempotente** (`createOrReplace` com IDs fixos):

| ID | Tipo |
|----|------|
| `siteConfig` | Configurações do Site |
| `category-estilo` … `category-modelagem` | 5 categorias |
| `project-floral` … `project-modelagem-prototipo` | 6 projetos |

Uploads usam SVGs em `public/placeholders/`. Pode reexecutar sem duplicar documentos.

## Seed manual (alternativa)

Se preferir criar no Studio (`/studio`):

## 1. Site Config (singleton)

Crie (ou edite) o documento **Configurações do Site**:

| Campo | Valor sugerido |
|-------|----------------|
| Título do Site | `Karina Reis` |
| Nome da Marca | `Karina Reis` |
| Meta Descrição | `Portfólio de Karina Reis — estilo, estamparia, direção, desenho e modelagem.` |
| Label do CTA | `ABRIR` |
| LinkedIn | URL do perfil (opcional) |
| Instagram | URL do perfil (opcional) |
| E-mail | e-mail de contato (opcional) |
| Logo Splash | upload opcional; senão a UI usa o nome tipográfico |

## 2. Categorias (5 documentos)

Crie um documento **Categoria** para cada linha, na ordem:

| Título | Slug | Ordem |
|--------|------|-------|
| Estilo | `estilo` | 1 |
| Estamparia | `estamparia` | 2 |
| Direção | `direcao` | 3 |
| Desenho | `desenho` | 4 |
| Modelagem | `modelagem` | 5 |

Descrição: opcional (ex.: “Projetos de estilo e lookbook”).

## 3. Projetos (exemplos espelhados da IA)

Para cada projeto:

1. Título + slug (ex.: `Floral` → `floral`)
2. **Categorias**: referência(s) aos docs acima (mín. 1)
3. Ano
4. Thumbnail: use placeholder local em `public/placeholders/` (upload no Studio a partir desses arquivos, ou qualquer imagem neutra)
5. Galeria: 1–3 imagens placeholder
6. Descrição: Portable Text curto
7. Ordem de exibição

### Sugestões de seed (títulos da referência)

| Título | Slug | Categoria | Ano |
|--------|------|-----------|-----|
| Floral | `floral` | Estilo | 2023 |
| Besora | `besora` | Estilo | 2022 |
| Estampa I | `estampa-i` | Estamparia | 2023 |
| Direção Lookbook | `direcao-lookbook` | Direção | 2024 |
| Desenhos | `desenhos` | Desenho | 2021 |
| Modelagem Protótipo | `modelagem-prototipo` | Modelagem | 2022 |

> Não republicar assets da referência Marina. Use apenas placeholders locais ou fotos próprias.

## 4. Placeholders locais

Arquivos em `public/placeholders/`:

- `project.svg` — fallback genérico (também usado por `imageUrlFromSanity`)
- `project-1.svg` … `project-3.svg` — variações para upload no Studio

## 5. Verificação

1. `/` — splash “Karina Reis” + CTA ABRIR
2. `/menu` — 5 categorias
3. `/categoria/estilo` — projetos da categoria
4. `/projeto/floral` — detalhe com galeria/texto
5. Remover um projeto no Studio → some do grid e 404 no slug

## Notas

- Schemas: `sanity/schemas/category.ts`, `project.ts`, `siteConfig.ts`
- Queries: `lib/cms.ts`
- Brand final do cliente substitui “Karina Reis” numa change futura (DEC-BR-08)
