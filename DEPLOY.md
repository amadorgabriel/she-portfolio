# 🚀 Guia de Deploy - Y2K Fashion Portfolio

## ✅ Status: PROJETO CONFIGURADO E PRONTO PARA DEPLOY

O projeto já está configurado com:
- ✅ Next.js 14+ com TypeScript
- ✅ Sanity CMS integrado
- ✅ Sanity Studio embedded (rota `/studio`)
- ✅ Type-safe API com GROQ
- ✅ Componentes Y2K prontos

---

## 🎯 Opção Recomendada: Sanity Studio Embedded (1 deploy só)

Com essa configuração, o Sanity Studio roda dentro do seu projeto Next.js na rota `/studio`.

**Vantagens:**
- Apenas um deploy na Vercel
- Site e CMS no mesmo lugar
- Autenticação compartilhada
- Domínio customizado para ambos

---

## 📋 Passo a Passo do Deploy

### 1. Criar Projeto no Sanity.io

**Opção A: Via CLI (mais rápido)**
```bash
# Instale o Sanity CLI globalmente
npm install -g @sanity/cli

# Login
sanity login

# Criar projeto (escolha "Create new project")
sanity init
```

**Opção B: Via Dashboard**
1. Acesse [sanity.io/manage](https://www.sanity.io/manage)
2. Clique "Create Project"
3. Dê o nome "Y2K Fashion Portfolio"
4. Selecione plano (Free é suficiente para começar)
5. Anote o **Project ID** que aparecerá

### 2. Configurar Variáveis de Ambiente

Copie o `projectId` gerado e atualize `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id_aqui
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=seu_token_aqui
```

**Como obter o token:**
1. Vá em [sanity.io/manage](https://www.sanity.io/manage)
2. Selecione seu projeto
3. API → Tokens → Add API Token
4. Dê permissão de "Viewer" (apenas leitura) ou "Editor" (se precisar editar)

### 3. Deploy na Vercel

#### Opção A: Deploy via CLI (Mais rápido)

```bash
# Instale a Vercel CLI se não tiver
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Opção B: Deploy via GitHub + Vercel Dashboard (Recomendado para CI/CD)

1. **Crie um repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create y2k-fashion-portfolio --public --source=.
   ```

2. **Conecte na Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Importe o repositório GitHub
   - Selecione "Next.js" como framework

3. **Configure as Environment Variables:**
   No dashboard da Vercel, vá em:
   ```
   Settings → Environment Variables
   ```
   Adicione todas as variáveis do `.env.local`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_READ_TOKEN`

4. **Deploy automático:**
   - Todo push na branch `main` fará deploy automaticamente
   - Pull Requests geram preview deployments

---

## 🎨 Acessando o Sanity Studio

Após o deploy, acesse:
```
https://seu-site.vercel.app/studio
```

Aqui você pode gerenciar todo o conteúdo do portfólio!

---

## 📁 Estrutura do Projeto

```
y2k-fashion-portfolio/
├── app/
│   ├── page.tsx           # Página inicial
│   ├── studio/            # ← Sanity Studio embedded
│   │   └── [[...tool]]/
│   │       └── page.tsx
│   └── ...
├── sanity/
│   ├── schemas/           # Schemas do CMS
│   ├── client.ts          # Cliente Sanity
│   └── config.ts          # Configuração
└── ...
```

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build de produção local
npm run build

# Acessar Sanity Studio local
# Após rodar npm run dev, acesse:
# http://localhost:3000/studio
```

---

## 🚨 Troubleshooting

### Erro: "Connect this studio to your project" / "This studio is not registered"
O Sanity bloqueia o Studio em origins que não estão na allowlist CORS do projeto. Isso aparece ao **trocar o domínio na Vercel** (ex.: `reiskarina.vercel.app` → `karinadosreis.vercel.app`).

**Correção (obrigatória):**
1. Abra [https://www.sanity.io/manage](https://www.sanity.io/manage) → seu projeto → **API** → **CORS Origins**
2. Adicione `https://karinadosreis.vercel.app` (URL exata, com `https://`)
3. Marque **Allow credentials**
4. (Opcional) Mantenha o domínio antigo se ainda redireciona ou é usado em previews
5. Volte a `/studio` e recarregue (a tela do Studio também tem atalho "Register studio" / "Add development host")

**Também atualize na Vercel:**
- `NEXT_PUBLIC_SITE_URL=https://karinadosreis.vercel.app` → depois faça redeploy

### Erro: "Project ID not found"
Verifique se `NEXT_PUBLIC_SANITY_PROJECT_ID` está configurado nas variáveis de ambiente da Vercel.

### Erro: "Unauthorized"
Verifique se o `SANITY_API_READ_TOKEN` está configurado corretamente.

### Imagens não carregam
Verifique se o domínio `cdn.sanity.io` está nas `remotePatterns` do `next.config.ts` (já está configurado).

---

## 🌟 Funcionalidades Pós-Deploy

Após deploy:
1. ✅ Site público em `https://seu-site.vercel.app`
2. ✅ CMS em `https://seu-site.vercel.app/studio`
3. ✅ Preview automático em cada PR
4. ✅ Deploy contínuo do GitHub

---

## 💡 Dica: Preview Mode (Opcional)

Para ver drafts antes de publicar, você pode configurar Preview Mode. Veja a documentação do Next.js para mais detalhes.

---

## Variáveis de ambiente (Vercel / produção)

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sim | ID do projeto Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Não (default `production`) | Dataset publicado |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Não | Versão da API GROQ |
| `SANITY_API_READ_TOKEN` | Recomendada | Token só leitura para preview/drafts |
| `NEXT_PUBLIC_SITE_URL` | **Recomendada** | URL canónica do site (ex. `https://seudominio.com`) — usada em `sitemap.xml`, `robots.txt`, Open Graph absoluto e schema Person |
| `VERCEL_URL` | Automática na Vercel | Fallback quando `NEXT_PUBLIC_SITE_URL` não está definida |

### Build e análise de bundle

- **Build de produção:** `npm run build` (comando padrão na Vercel).
- **Analisar tamanho dos bundles (local):** `npm run analyze` — abre relatório interativo após o build quando `ANALYZE=true` (via `cross-env`).

### Domínio customizado (Vercel)

1. No projeto Vercel: **Settings → Domains** → adicionar o domínio.
2. Configure os registos DNS indicados (CNAME ou A para `cname.vercel-dns.com` / IPs da Vercel).
3. Defina `NEXT_PUBLIC_SITE_URL` com o URL final (com `https://`) e redeploy.

---

**Pronto!** Seu portfólio Y2K está no ar! 🎀✨
