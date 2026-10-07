---
name: Calculadora Med UFMT
description: Calculadora de médias e CR do curso de Medicina da UFMT, desenhada como um cartão-resposta óptico.
colors:
  ground: "#f6f0ed"
  paper: "#ffffff"
  ink: "#1a1614"
  ink-2: "#5b504b"
  ink-3: "#85766f"
  form: "#e0643f"
  form-text: "#b0401d"
  form-line: "#f0c3b3"
  form-line-strong: "#e7a48d"
  form-tint: "#fbe6de"
  field: "#fdf3ef"
  placeholder: "#93604f"
  ok: "#17734a"
  ok-tint: "#d9eee3"
  exam: "#9a5a00"
  exam-tint: "#f8e7c8"
  fail: "#a3123a"
  fail-tint: "#f6d6de"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 750
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
  numeral:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "tnum"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.04em"
    fontVariation: "'wdth' 75"
rounded:
  sm: "2px"
  md: "3px"
  full: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  gutter-mobile: "16px"
  gutter-desktop: "40px"
components:
  sheet:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.md}"
  sheet-head:
    backgroundColor: "{colors.form-tint}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    padding: "14px 18px 12px 30px"
  sheet-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "54px"
    padding: "8px 18px 8px 0"
  sheet-row-hover:
    backgroundColor: "{colors.field}"
  bubble:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.form-text}"
    rounded: "{rounded.full}"
    size: "30px"
  bubble-marked-a:
    backgroundColor: "{colors.ok}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
  bubble-marked-e:
    backgroundColor: "{colors.exam}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
  bubble-marked-r:
    backgroundColor: "{colors.fail}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
  nav-bubble:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.form-text}"
    rounded: "{rounded.full}"
    size: "28px"
  nav-bubble-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
  input-number:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.numeral}"
    rounded: "{rounded.sm}"
    height: "46px"
    padding: "0 12px"
  input-number-focus:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  weight-badge:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.form-text}"
    rounded: "{rounded.sm}"
    padding: "1px 7px"
  mode-btn:
    backgroundColor: "{colors.field}"
    textColor: "{colors.form-text}"
    height: "34px"
    padding: "0 14px"
  mode-btn-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-clear:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.form-text}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 18px"
  button-clear-hover:
    textColor: "{colors.fail}"
  notice-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "1px 8px"
---

# Design System: Calculadora Med UFMT

## Overview

**Creative North Star: "O Cartão-Resposta"**

Cada matéria é uma linha de uma folha óptica de respostas. O aluno preenche os campos; a calculadora preenche a bolinha A / E / R. Tudo o que é estrutura impressa do formulário (fios, caixas de preenchimento, contornos das bolinhas, rótulos em caixa-alta condensada) sai em tinta salmão de dropout, a mesma cor que as leitoras ópticas ignoram. Tudo o que é marcado, seja pelo aluno ou pela calculadora (valores digitados, bolinhas preenchidas, marcas de sincronismo pretas), sai em tinta preta. A cor de status existe apenas no status.

A densidade é a de um formulário: folhas brancas sobre um fundo salmão quase imperceptível, cantos pequenos como papel cortado, fios finos no lugar de cartões flutuantes. A tela é de leitura rápida no celular, então a hierarquia vem do peso e da largura da Archivo, não de cor nem de volume.

O sistema recusa o padrão "cartão branco com pílula colorida de status". Também não imita a identidade da UFMT: é um projeto de aluno, com aparência de papel de prova, não de portal institucional.

**Key Characteristics:**
- Duas tintas: salmão para o que é impresso, preto para o que é marcado.
- Status como bolinha preenchida (A verde, E âmbar, R carmim), nunca como pílula.
- Rótulos de formulário em Archivo condensada (wdth 75), caixa-alta, tinta salmão.
- Folhas planas com cantos de 2–3px e fios de 1–1.5px.
- Mudanças de estado em degraus (steps(2) 90ms), sem easing.

## Colors

Um papel quente, uma tinta de formulário salmão em quatro intensidades, uma tinta preta em três tons, e três cores de status com seus tons claros.

### Primary
- **Salmão de Dropout** (form): a tinta impressa do formulário. Contornos de bolinhas, fio inferior do cabeçalho da folha, fio do CR, marcas da régua 0–10, sublinhado de links. Só em traços e contornos; nunca em texto.
- **Salmão Legível** (form-text): a mesma tinta escurecida para texto pequeno. Rótulos de campo, legendas da folha, letras dentro das bolinhas vazias, selos de peso, números da régua.

### Secondary
- **Verde Aprovado** (ok) e **Tom Aprovado** (ok-tint): bolinha A marcada, texto "Aprovado", trecho 7–10 da régua.
- **Âmbar Exame** (exam) e **Tom Exame** (exam-tint): bolinha E marcada, texto "Exame Final", trecho 5–7 da régua.
- **Carmim Reprovado** (fail) e **Tom Reprovado** (fail-tint): bolinha R marcada, texto "Reprovado", trecho 0–5 da régua, campo inválido e hover do botão de limpar.

### Neutral
- **Fundo Salmão Pálido** (ground): o fundo da página, sob as folhas.
- **Papel** (paper): toda folha, cartão de matéria e aviso.
- **Faixa Salmão** (form-tint): trilho lateral / faixa superior no celular e cabeçalho das folhas-resumo. Também a `theme-color` do navegador.
- **Caixa de Preenchimento** (field): fundo dos campos de nota, do alternador de modo, do aviso do iPhone e do hover das linhas da folha.
- **Fio Salmão** (form-line) e **Fio Salmão Forte** (form-line-strong): divisores entre linhas e bordas de folhas; contornos de campos, selos de peso e bolinhas inativas.
- **Tinta** (ink): texto principal, valores digitados, bolinhas marcadas no trilho, marcas de sincronismo, foco.
- **Tinta Secundária** (ink-2) e **Tinta Apagada** (ink-3): textos de apoio; nota vazia e resultado ainda sem status.
- **Placeholder** (placeholder): texto de exemplo dentro dos campos.

### Named Rules
**The Two Inks Rule.** Salmão é o que a gráfica imprimiu; preto é o que alguém marcou. Se o elemento é estrutura, é salmão. Se é valor, escolha ou estado ativo, é preto.

**The Status-Only Rule.** Verde, âmbar e carmim aparecem só para comunicar Aprovado / Exame / Reprovado (e o carmim também para erro e ação destrutiva). Nenhuma decoração usa essas cores.

**The Dropout Legibility Rule.** O salmão de dropout (form) só traça linhas. Qualquer texto em salmão usa form-text.

## Typography

**Display Font:** Archivo (com system-ui, sans-serif)
**Body Font:** Archivo (com system-ui, sans-serif)
**Label Font:** Archivo no eixo de largura 75 (condensada)

**Character:** Uma única família variável (wdth 62–125, wght 400–800) faz o papel de todas as vozes do formulário: larga e pesada para os números, regular para o texto, condensada em caixa-alta para o que é impresso.

### Hierarchy
- **Display** (750, 44px, 1.05, numerais tabulares): a nota final de cada matéria e do CR.
- **Headline** (750, 32px no desktop / 26px no celular, 1.1): título do semestre no topo da coluna principal.
- **Title** (700, 19px, 1.2): nome da matéria no cabeçalho da folha.
- **Title-sm** (700, 16px): cabeçalho da folha-resumo e nome do semestre na lista inicial.
- **Body** (400, 15px, 1.45): texto corrido; avisos limitados a 72ch. Texto de apoio em 13.5–14px, ink-2.
- **Numeral** (600, 18px, tabular): valores digitados nos campos e notas na folha-resumo (700).
- **Label** (600–700, 11–12.5px, wdth 75, caixa-alta, 0.04em): rótulos de campo, legendas, selos de peso, soma dos pesos, números da régua, etiquetas de aviso.

### Named Rules
**The Tabular Numbers Rule.** Todo número que se compara (notas, pesos, somas, acertos) usa `font-variant-numeric: tabular-nums`.

**The Printed Label Rule.** Caixa-alta condensada é reservada para texto que rotula um campo ou uma régua do formulário. Frases, avisos e checkboxes voltam à largura normal e caixa normal.

## Layout

Desktop: grade de duas colunas, trilho lateral fixo de 236px (form-tint, borda direita em form-line) e coluna principal com no máximo 1180px, margens de 40px. A folha-resumo do semestre ocupa o topo; as folhas das matérias seguem numa grade `auto-fit` de colunas com mínimo de 420px e espaço de 20px. A tela inicial limita-se a 980px.

Celular (≤ 820px): o trilho vira uma faixa horizontal no topo, com o nome do app e as bolinhas numeradas dos semestres rolando lateralmente (rótulos escondidos visualmente, bolinhas de 36px). Margens de 16px, uma coluna, espaço de 16px entre folhas. Em ≤ 380px os campos de cada folha passam de duas colunas para uma.

Ritmo: 4 / 8 / 16 / 20 / 24px, com preenchimentos internos das folhas em 18–20px (16px no celular). Linhas da folha-resumo têm no mínimo 54px de altura; alvos de toque (botões, checkboxes) no mínimo 44px.

## Elevation & Depth

Plano, como papel sobre a mesa. Profundidade vem do contraste papel branco sobre fundo salmão pálido e dos fios, não de sombra. Existe uma única sombra, quase invisível, que só separa a folha do fundo.

### Shadow Vocabulary
- **Papel assentado** (`box-shadow: 0 1px 2px rgba(26, 22, 20, 0.07)`): folhas-resumo e folhas das matérias. Folhas "em construção" não a usam.
- **Anel de foco do campo** (`box-shadow: 0 0 0 1px var(--ink)`): reforço da borda preta no campo focado; não é elevação.

### Named Rules
**The Paper Rule.** Uma folha nunca flutua. Nada de sombras difusas, desfoque ou elevação no hover; o hover muda a tinta, não a altura.

## Shapes

Cantos de papel cortado: 3px nas folhas e avisos, 2px em campos, selos, botões e etiquetas. A única curva cheia é o círculo da bolinha óptica (navegação, A/E/R, faixa de acertos, "Notas salvas"). Bordas em 1px (fios) e 1.5px (contornos que pedem preenchimento). Tracejado significa provisório ou calculado: a linha do resultado, campos somente-leitura e folhas "em construção". A marca de sincronismo é um retângulo preto de 12×18px colado à margem esquerda de cada linha.

## Components

### Folha-resumo (gabarito)
Uma folha com cabeçalho em faixa salmão e fio inferior de 1.5px em form, título e legenda "A aprovado · E exame · R reprovado". Cada linha é um botão: marca de sincronismo, nome, nota em numerais tabulares, e as três bolinhas A/E/R (26px). Linhas separadas por form-line; a linha do CR fica por último, com fio superior em form e nome em peso 800. Hover em field. Na tela inicial a mesma folha lista os semestres, com o código UC em rótulo salmão e "Notas salvas" marcado à caneta (ponto preto de 10px); semestres futuros têm marca de sincronismo em form-line-strong e bolinhas numeradas vazias.

### Bolinhas A / E / R
Círculos de 30px com contorno de 1.5px em form e letra em form-text condensada. Marcada: preenchimento e contorno na cor do status, letra em papel, entra com o degrau `mark` (escala 0.82 → 1 em steps(2) 90ms). Só uma bolinha marcada por resultado.

### Folha da matéria (cards)
- **Corner Style:** 3px.
- **Background:** papel, borda form-line, sombra papel assentado.
- **Header:** título 19px, descrição em ink-2 13.5px, e a soma dos pesos fechando em 10 ("PESOS 1 + 2.25 + … = 10") como rótulo salmão.
- **Internal Padding:** 18–20px; campos em grade de duas colunas com espaço de 16px.
- **Destaque ao navegar:** a borda pisca para preto em três degraus (900ms).
- **Resultado:** separado por fio tracejado em form-line-strong; rótulo "NOTA FINAL", nota em display, bolinhas à direita, texto de status na cor do status e a régua 0–10.

### Campos de nota (inputs)
- **Style:** fundo field, borda 1.5px form-line-strong, 2px de canto, 46px de altura, numerais 18px/600 em tinta.
- **Hover:** borda em form.
- **Focus:** fundo papel, borda e anel de 1px em tinta.
- **Inválido:** borda fail. **Somente-leitura:** fundo transparente, borda tracejada, texto ink-2.
- **Rótulo:** caixa-alta condensada em form-text, com o selo de peso (borda form-line-strong, 2px) alinhado à direita.
- **Checkbox:** quadrado de 20px, contorno form; marcado vira preto com respiro interno branco de 3px.

### Faixa de acertos (OMR strip)
Para campos por número de acertos: bolinhas de 9px agrupadas, contorno form-line-strong, que se preenchem de tinta conforme o aluno digita.

### Régua 0–10
Trilho de 6px com os três tons de status (0–5, 5–7, 7–10), traços em form nas linhas de corte 5 e 7 com os números em rótulo salmão, e um marcador preto de 3×16px na nota atual (oculto sem nota).

### Navegação
Lista de bolinhas numeradas de 28px (36px no celular) com contorno form e número em form-text; o item ativo fica preenchido de tinta com número em papel e texto em peso 700. Hover do item: véu salmão translúcido. No celular, só as bolinhas, em rolagem horizontal.

### Botões
- **Alternador acertos / nota:** caixa field com borda form-line-strong e 3px de respiro; a opção ativa é um bloco de tinta com texto papel.
- **Limpar notas:** contorno 1.5px form-line-strong sobre papel, texto form-text, 44px; no hover, borda e texto viram fail.
- **Etiqueta de aviso:** bloco de tinta com texto papel em caixa-alta condensada 11px.

## Do's and Don'ts

### Do:
- **Do** desenhar toda estrutura nova (fios, contornos, rótulos) em salmão e todo valor ou estado marcado em tinta (#1a1614).
- **Do** comunicar status com a bolinha preenchida e o texto na cor do status; os tons claros só na régua.
- **Do** usar Archivo condensada (wdth 75) em caixa-alta para rótulos de campo e de régua, em form-text.
- **Do** manter cantos em 2–3px e bordas em 1px ou 1.5px.
- **Do** animar mudanças de estado em degraus (`steps(2, jump-end) 90ms`) e desligar animações com `prefers-reduced-motion`.
- **Do** usar tracejado para o que é calculado, somente-leitura ou ainda em construção.

### Don't:
- **Don't** usar pílulas ou cartões coloridos para status; o status é a bolinha.
- **Don't** usar verde, âmbar ou carmim fora de status, erro ou ação destrutiva.
- **Don't** escrever texto com o salmão de dropout (#e0643f); texto salmão é sempre form-text.
- **Don't** adicionar sombras difusas, elevação no hover ou transições com easing.
- **Don't** imitar a identidade visual da UFMT nem criar um tema escuro; o produto é papel claro.
