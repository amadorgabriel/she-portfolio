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
Peça do portfólio com conteúdo editorial em blocos, metadados e uma ou mais categorias.
_Avoid_: post, work item

**Conteúdo do projeto**:
Lista ordenada de blocos (`content[]`) que compõem a página pública do **Projeto** — texto, imagem, vídeo ou galeria.
_Avoid_: page builder genérico, corpo único fixo

**Bloco de texto**:
Unidade de **Conteúdo do projeto** com corpo em Portable Text (`projectText`).
_Avoid_: description como nome de bloco

**Bloco de imagem**:
Unidade de **Conteúdo do projeto** com uma imagem, alt e legenda opcional (`projectImage`).
_Avoid_: item solto fora de bloco

**Bloco de vídeo**:
Unidade de **Conteúdo do projeto** com vídeo Mux, alt, legenda e poster opcional (`projectVideo`).
_Avoid_: embed avulso fora do page builder

**Bloco de galeria**:
Unidade de **Conteúdo do projeto** que agrupa zero ou mais **Mídias de galeria** em `items[]` (`projectGallery`). No Studio aparece como **Galeria**.
_Avoid_: campo top-level `gallery[]` (removido do schema)

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
Arte associada à categoria, usada como plano de fundo full-bleed (sem overlay) da página da categoria; nos projetos, herda da primeira categoria referenciada. No mobile, deve permanecer visualmente estável durante o scroll (efeito fixed).
_Avoid_: banner, hero image (neste contexto), overlay automático

**Galeria**:
Lista ordenada de mídias dentro de um **Bloco de galeria**. Editada no Studio.
_Avoid_: carousel (salvo se a UI pública virar carousel), “Galeria de Imagens” como nome de domínio

**Mídia de galeria**:
Unidade da Galeria: imagem ou vídeo no mesmo campo.
_Avoid_: attachment, só-imagem como unidade canônica

**Vídeo da galeria**:
Mídia hospedada na Mux com streaming HLS (upload direto e resumável, sem limite de ~100MB do file asset); o Studio guarda a referência ao asset Mux e o site renderiza via player Mux.
_Avoid_: file asset do Sanity, URL direta de arquivo

**Texto alternativo**:
Texto de acessibilidade obrigatório da mídia (`alt`); bloqueia publish se ausente.
_Avoid_: description como sinônimo de alt

**Legenda**:
Texto visível opcional associado à mídia (`caption`). No vocabulário editorial do pedido, “descrição” da mídia significa Legenda.
_Avoid_: description como campo Sanity separado; alt

**Preview da galeria**:
Modal/lightbox ao tocar um item da Galeria no site público.
_Avoid_: lightbox como termo de domínio preferencial

**Studio**:
Sanity Studio embutido no path `/studio`, único lugar de edição de conteúdo (incluindo upload em lote da Galeria).
_Avoid_: CMS admin genérico, UI de upload custom no Next para a Galeria

## Relationships

- Uma **Categoria** contém zero ou mais **Projetos**
- Um **Projeto** pertence a uma ou mais **Categorias**
- Um **Projeto** tem zero ou mais blocos em **Conteúdo do projeto** (ordem editorial da página)
- Um **Bloco de galeria** contém zero ou mais **Mídias de galeria** em `items[]`
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

> **Dev:** "A 'descrição' da foto na galeria é o alt?"
> **Domain expert:** "Não. 'Descrição' no pedido editorial é a **Legenda** (opcional). O **Texto alternativo** é outro campo e é obrigatório para publicar."

> **Dev:** "Vídeo vai num campo separado?"
> **Domain expert:** "Não. Vídeo é **Mídia de galeria** no mesmo campo da **Galeria**."

> **Dev:** "Onde faço upload em lote?"
> **Domain expert:** "Só no **Studio** (`/studio`). Não há tela de upload da Galeria no site Next."

## Flagged ambiguities

- `splashLogo` no schema atual é o campo legado da arte da **Marca** — consolidar na UX/docs; não tratar como conceito separado.
- Rotas públicas: `/categoria/[slug]` e `/projeto/[slug]`. Paths legados `/c` e `/p` não redirecionam (404).
- Campos removidos do Studio nesta change: `materials`, `team`, `tools`, `analytics`. `favicon` passa a ser usado de verdade.
- **Schema Studio (change 004 em Design):** título do campo ainda pode aparecer como “Galeria de Imagens” no código até PR1 renomear para **Galeria**; tipo de vídeo (`galleryVideo`) a confirmar na Execute.
- Player de vídeo (poster, autoplay, controls): defaults no Design; não grilled em detalhe.
