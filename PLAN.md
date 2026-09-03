# Planejamento de Conversão: React → Astro + Tailwind CSS + shadcn + Alpine.js

## 📋 Escopo do Projeto
Migrar 100% da Landing Page da JLA Code de React SPA (Vite) para **Astro + Tailwind CSS + shadcn + Alpine.js**, mantendo rigorosamente o design, tipografia, efeitos visuais, interações e conteúdo originais.

---

## 🎯 Fases e Checklist de Execução

- [x] **Fase 1: Preparação e Planejamento**
  - [x] Criar arquivo de planejamento (`PLAN.md`)
  - [x] Mapear todas as seções, estados e interações do app React
  - [x] Instalar dependências necessárias (`astro`, `@astrojs/alpinejs`, `alpinejs`, `lucide-astro`, `@tailwindcss/vite`)

- [x] **Fase 2: Estruturação e Configuração do Astro**
  - [x] Criar `astro.config.mjs` configurando Tailwind e Alpine.js
  - [x] Configurar porta 3000 e host 0.0.0.0 para ambiente de dev/preview
  - [x] Configurar fontes (Space Grotesk / DM Sans / IBM Plex Mono), cores e tokens do Tailwind (shadcn style tokens em `src/styles/global.css`)
  - [x] Atualizar scripts em `package.json` (`dev`, `build`, `lint`)

- [x] **Fase 3: Componentes e Primitives shadcn (Astro + Tailwind)**
  - [x] Criar componentes shadcn adaptados para Astro:
    - `Button.astro` (variantes: default/primary, outline, ghost, kicker, pill)
    - `Badge.astro` (variantes: default, kicker, tech)
    - `Card.astro`, `CardHeader.astro`, `CardTitle.astro`, `CardContent.astro`
    - `Input.astro` e `Textarea.astro`
    - `Separator.astro`
    - `BrandMark.astro`
  - [x] Utilizar `lucide-astro` para renderização estática e vetorizada de ícones Lucide

- [x] **Fase 4: Migração das Seções com Alpine.js**
  - [x] `Header.astro`: Barra de navegação com menu responsivo mobile gerenciado via Alpine.js (`x-data="{ mobileMenuOpen: false }"`), transições fluidas e scroll suave
  - [x] `NeuralNetwork.astro`: Background interativo com nós e conexões neurais em SVG animado, física com inércia e reatividade ao ponteiro via Alpine.js (`@mousemove.window`, `@mouseleave.window`, `requestAnimationFrame`)
  - [x] `Hero.astro`: Headline com tipografia de alto impacto, tags, botões de ação e métricas
  - [x] `Services.astro`: Grid de serviços ("O que eu faço") com numeração, ícones e bullets
  - [x] `Stacks.astro`: Categorias Frontend, Backend e Infraestrutura com tags de tecnologias
  - [x] `ParallaxBand.astro`: Faixa de destaque visual com efeito de movimento
  - [x] `Process.astro`: Etapas do processo ("Como funciona: 01 Entender, 02 Construir, 03 Evoluir")
  - [x] `About.astro`: Card de perfil, foto/iniciais de José Luis Aldrighi, bio e link LinkedIn
  - [x] `Contact.astro`: Formulário de contato com feedback de envio reativo via Alpine.js (`x-data="{ submitted: false }"`), link WhatsApp direto
  - [x] `Footer.astro`: Rodapé com direitos, links sociais e botão de voltar ao topo

- [x] **Fase 5: Página Principal e Layouts**
  - [x] Criar `src/layouts/Layout.astro` com meta tags, fontes e favicon
  - [x] Criar `src/pages/index.astro` integrando todas as seções
  - [x] Sincronizar `metadata.json`

- [x] **Fase 6: Compilação e Validação**
  - [x] Executar `compile_applet` e resolver avisos de build (Build concluído com sucesso)
  - [x] Testar interatividade do Alpine.js (menu mobile, formulário, background dinâmico, navegação)
  - [x] Validar compatibilidade estática no `dist/`

- [x] **Fase 7: Limpeza dos Arquivos Antigos do React**
  - [x] Remover pasta legada `client/`
  - [x] Atualizar `tsconfig.json` para incluir `src/**/*`
  - [x] Atualizar status final no `PLAN.md`
