# 🎀 Portfólio Y2K - Fashion Designer

Um portfólio interativo de designer de moda com estética Y2K/jogos de dress-up dos anos 2000.

## ✨ Conceito

> **"Meu Closet Virtual, Meu Mundo"**

Este não é um portfólio linear — é um quarto/jogo de moda onde cada peça do trabalho da designer é um item de roupa ou acessório customizável. A navegação simula abrir gavetas, trocar manequins, colar polaroids na parede e abrir janelas pop-up estilo Windows 2000.

## 🚀 Tecnologias

- **Next.js 14+** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **clsx + tailwind-merge** - Gerenciamento de classes

## 📦 Instalação

```bash
# Clone o repositório
git clone <url-do-repositório>

# Entre na pasta do projeto
cd y2k-fashion-portfolio

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🎨 Paleta de Cores Y2K

| Nome | Hex | Uso |
|------|-----|-----|
| Pink 2000 | `#FF1493` | Fundo de botões, destaques |
| Glitter Pink | `#FF69B4` | Hover, brilhos, bordas |
| Cyber Pink | `#FF1493` | Cursores, acentos |
| Soft White | `#FFF0F5` | Fundos principais |
| Night Purple | `#4B0082` | Textos secundários, pop-ups |
| Flash Photo | `#FFE55C` | Destaque de fotos |
| Leopard Brown | `#D4A373` | Padrões, texturas |
| Polaroid Off-white | `#FDF5E6` | Cards, legendas |

## 🔤 Tipografia

| Tipo | Fonte | Uso |
|------|-------|-----|
| Display | **Fredoka One** | Títulos, nome da designer |
| Terminal | **VT323** | Pop-ups, textos técnicos |
| Handwriting | **Caveat** | Legendas, post-its |
| Body | **Inter** | Texto corrido |

## 🗂️ Estrutura de Pastas

```
y2k-fashion-portfolio/
├── app/
│   ├── layout.tsx          # Layout raiz com fontes e metadados
│   ├── page.tsx            # Página inicial
│   ├── globals.css         # Estilos globais e tema Y2K
│   ├── lookbook/           # Seção de coleções
│   ├── styling-lab/        # Projetos de styling
│   ├── sketchbook/         # Ilustrações e croquis
│   ├── runway/             # Vídeos de desfiles
│   ├── about/              # Página sobre (estilo MySpace)
│   └── contact/            # Formulário de contato
├── components/
│   ├── ui/                 # Componentes reutilizáveis
│   ├── mannequin/          # Componente do manequim
│   ├── polaroid/           # Cards estilo polaroid
│   └── windows/            # Janelas estilo Windows 2000
├── lib/
│   └── utils.ts            # Utilitários (cn, etc)
├── public/
│   ├── cursors/            # Cursores personalizados
│   ├── patterns/           # Texturas e padrões
│   └── sounds/             # Efeitos sonoros (opcional)
└── types/
    └── index.ts            # Tipos TypeScript
```

## 🎮 Funcionalidades Planejadas

### MVP (Sprint Atual)
- [x] Estrutura base com Next.js + Tailwind
- [x] Configuração de tema Y2K (cores, fontes, animações)
- [ ] Manequim central + 4 gavetas principais
- [ ] Galeria com polaroid + modal pop-up
- [ ] CMS para projetos, imagens, textos
- [ ] Formulário de contato funcional
- [ ] Responsividade básica

### Futuro (v2)
- [ ] Drag & drop de acessórios
- [ ] Sistema de favoritos (localStorage)
- [ ] Sons de interação (toggle)
- [ ] Blog
- [ ] Versão em inglês

## 🎨 Diretrizes de Design

- ❌ Nada de design "flat" ou minimalista
- ❌ Evitar glassmorphism genérico
- ✅ Cursores personalizados (💄, ⭐, ✂️)
- ✅ Botões glossy com gradiente e sombra
- ✅ Padrões de leopard print e xadrez
- ✅ Polaroids com bordas brancas
- ✅ Janelas pop-up estilo Windows 2000
- ✅ Animações: float, sparkle, wiggle, glossy-shine

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz:

```env
# Exemplo de variáveis (ajuste conforme necessário)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CMS_API_URL=your-cms-url
```

## 📱 Responsividade

- **Desktop**: Experiência completa Y2K com manequim central e gavetas laterais
- **Tablet**: Layout adaptativo mantendo a estética
- **Mobile**: Modo "closet compacto" com menu hambúrguer

## 🌟 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa ESLint
```

## 📝 Notas de Desenvolvimento

- O projeto usa Tailwind CSS v4 com configuração via CSS
- Animações customizadas estão definidas em `globals.css`
- Cursores personalizados usam emojis via data URI SVG
- Fontes são carregadas via `next/font/google`

## 👩‍💻 Autor

Fashion Designer - [Instagram](https://instagram.com) | [Behance](https://behance.net)

---

💖 Feito com muito amor e glitter no ano 2000 (e alguns anos depois).
