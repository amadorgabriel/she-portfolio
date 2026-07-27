# she-portfolio

Portfólio web de designer de moda, com conteúdo editável via Sanity e navegação por categorias e projetos.

## Language

**Marca**:
Identidade exibida ao visitante: texto obrigatório (`brandName`) e arte opcional (imagem ou GIF). Se a arte existir, ela substitui o texto na splash e no header; sem arte, o texto prevalece.
_Avoid_: logo separado da marca, splashLogo como conceito distinto, “Nome da Marca” só como string sem arte

**Categoria**:
Agrupamento editorial de projetos, com slug próprio e opcionalmente arte de fundo.
_Avoid_: collection, tag

**Projeto**:
Peça do portfólio com galeria, metadados e uma ou mais categorias.
_Avoid_: post, work item

**Rota de categoria**:
Path público `/categoria/{slug}`.
_Avoid_: `/c/...`

**Rota de projeto**:
Path público `/projeto/{slug}`.
_Avoid_: `/p/...`

**Slug**:
Segmento de URL derivado do título (categoria ou projeto): apenas `a-z`, `0-9` e hífen; sem espaços, acentos, caracteres especiais, hífen nas bordas ou hífens duplos.
_Avoid_: path, permalink (como sinônimo no Studio)

**Fundo de categoria**:
Arte associada à categoria, usada como plano de fundo full-bleed (sem overlay) da página da categoria; nos projetos, herda da primeira categoria referenciada.
_Avoid_: banner, hero image (neste contexto), overlay automático

## Relationships

- Uma **Categoria** contém zero ou mais **Projetos**
- Um **Projeto** pertence a uma ou mais **Categorias**
- A **Marca** é única por site (documento de configuração)
- O **Fundo de categoria** de uma **Categoria** aplica-se à listagem dessa categoria
- Na página de um **Projeto**, o fundo herdado é o da **primeira Categoria** referenciada no documento do projeto

## Example dialogue

> **Dev:** "Se eu subir um GIF na **Marca**, o texto some?"
> **Domain expert:** "Sim — a arte substitui o texto na splash e no header. Se remover a arte, o texto da **Marca** volta."

> **Dev:** "Se o **Projeto** está em duas **Categorias** com fundos diferentes, qual fundo uso?"
> **Domain expert:** "O da primeira **Categoria** na lista do documento. Não há override no projeto."

> **Dev:** "O fundo precisa de um véu escuro para o título ficar legível?"
> **Domain expert:** "Não — full-bleed sem overlay. A arte que o editor sobe tem que funcionar sozinha."

> **Dev:** "Posso salvar o slug `Moda--SS26!`?"
> **Domain expert:** "Não. **Slug** só aceita minúsculas, números e hífen simples — sem `!`, sem `--`, sem hífen nas pontas."

## Flagged ambiguities

- `splashLogo` no schema atual é o campo legado da arte da **Marca** — consolidar na UX/docs; não tratar como conceito separado.
- Rotas públicas: `/categoria/[slug]` e `/projeto/[slug]`. Paths legados `/c` e `/p` não redirecionam (404).
- Campos removidos do Studio nesta change: `materials`, `team`, `tools`, `analytics`. `favicon` passa a ser usado de verdade.
