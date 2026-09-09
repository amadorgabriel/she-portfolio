# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere a [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased] — 2026-09-09

### Added

- Fundo customizável home/menu via Configurações do Site
- Vídeo na galeria via Mux (upload >100MB, streaming HLS, thumb automática + poster override)
- Mailto com assunto/corpo pré-preenchidos
- Scroll do BackToTop respeita prefers-reduced-motion

### Changed

- Label BackToTop em pt-BR ("↑ Voltar ao Topo")

### Removed

- Campos sem uso no Studio (Projeto.publishedAt, Categoria.description, Categoria.backgroundImage.alt) e fetch morto de títulos de categoria nos cards
- Nota: dados órfãos dos campos removidos NÃO foram migrados (decisão DEC-005-06 — reversível)
