# Calculadora Med UFMT

Calculadora web de médias e CR (Coeficiente de Rendimento) para estudantes de Medicina da UFMT. Suporta o cálculo dos três primeiros semestres do curso, com regras de peso específicas de cada UC (Unidade Curricular).

> Sistema de notas: **0 a 10**. Aprovado ≥ 7, Exame Final ≥ 5, Reprovado < 5.

## Recursos

- **Página inicial** — cards para ir direto ao semestre desejado
- **1º Semestre (UC1)** — Locomotor + Neuro + Interação Comunitária
- **2º Semestre (UC2)** — Cardiorespiratório + Digestório & Urogenital + IC + Antropologia
- **3º Semestre (UC3)** — B.A.D., Saúde do Adulto I, Saúde da Mulher I, Saúde da Criança e do Adolescente + IC
- **4º Semestre (UC4)** — Saúde da Mulher II, Saúde da Criança II, Saúde do Adulto II e CR (calculadora de CR com pesos fixos)
- Cálculo em tempo real conforme as notas são digitadas
- Notas salvas automaticamente no navegador (`localStorage`), com botão para limpar cada semestre
- CR auto-preenchido a partir das médias das matérias
- Status visual (Aprovado / Exame Final / Reprovado)
- Layout responsivo (mobile-friendly)

## Como usar

Por ser um site estático puro (HTML + CSS + JS), basta abrir `ufmt-med-calc/index.html` no navegador.

Ou então acessar a página: [Cliqe Aqui](https://am4ral.github.io/QualAMinhaMediaUFMT/)

## Estrutura

```
ufmt-med-calc/
├── index.html      # Markup e formulários dos três semestres
├── script.js       # Lógica de cálculo das médias e CR
└── style.css       # Tema visual (sidebar + cards)
```

## Fórmulas

### 1º Semestre (UC1)

**Introdução à Medicina** — mesmos pesos para Locomotor e Neuro:

| Item            | Peso |
|-----------------|-----:|
| Módulo          |   5  |
| Tutoria         |  2,5 |
| Seminário       |   1  |
| Prática de Anato|   1  |
| Histologia      |  0,5 |

```
CR = (Locomotor + Neuro + Interação Comunitária) / 3
```

### 2º Semestre (UC2)

**Introdução à Medicina 2** — mesmos pesos para Cardiorespiratório e Digestório & Urogenital (idênticos ao UC1).

```
CR = (CR Atual × 2 + IC + Antropologia + Cardiorespiratório + Digestório & Urogenital) / 5
```

### 3º Semestre (UC3)

**Bases de Agressão e Defesa (B.A.D.)** — pesos somam 1,0:

| Item          | Peso  |
|---------------|------:|
| Parasitologia | 0,225 |
| Imunologia    | 0,225 |
| Patologia     | 0,225 |
| Microbiologia | 0,225 |
| Virologia     | 0,100 |

**Saúde do Adulto I** — peso base 10 + bônus opcional:

| Item                 | Peso |
|----------------------|-----:|
| Módulo               |  4   |
| Tutoria (média 10x)  |  2,5 |
| Prática OSCE         |  1,25|
| Práticas no HUJM     |  1,25|
| Seminário            |  1   |
| 100% monitorias      | +0,5 |

**Saúde da Mulher I** — pesos somam 10:

| Item                | Peso |
|---------------------|-----:|
| Módulo              |  4   |
| Tutoria (média 4x)  |  2,5 |
| Prática             |  2   |
| Seminário           |  1   |
| Psicologia Médica   |  0,5 |

**Saúde da Criança e do Adolescente** — pesos somam 10:

| Item                | Peso |
|---------------------|-----:|
| Módulo              |  4,5 |
| Tutoria (média 3x)  |  3   |
| Seminário           |  1   |
| Relatório           |  1   |
| Psicologia Médica   |  0,5 |

```
CR = (CR Atual × 5 + B.A.D. + IC + Adulto + Mulher + Criança) / 13
```

### 4º Semestre (UC4)

**Saúde da Mulher II** — pesos somam 10:

| Item            | Peso |
|-----------------|-----:|
| Prova de Módulo |   5  |
| Tutoria         |  3,5 |
| Seminário       |  1,5 |

A prova de módulo (0–10) tem 20 questões fechadas (0,4 cada — peso 4 na média) e 2 abertas (1 ponto cada — peso 1 na média):

```
Nota da prova = Acertos nas fechadas × 0,4 + Abertas
```

Um botão alterna entre informar acertos + abertas ou digitar a nota da prova direto.

**Saúde da Criança II** — pesos somam 10:

| Item            | Peso |
|-----------------|-----:|
| Prova de Módulo |   5  |
| Tutoria         |  3,5 |
| Seminário       |   1  |
| Prática         |  0,5 |

A prova de módulo (0–10) tem 24 questões fechadas (0,25 cada = 6) e 2 abertas de 4 letras (0,5 por letra = 4):

```
Nota da prova = Acertos nas fechadas × 0,25 + Abertas
```

O mesmo botão permite digitar a nota da prova direto. A forma de avaliação da prática ainda não foi definida. Os pesos da prova são baseados na prova da turma passada e podem mudar — a página exibe um aviso sobre isso.

**Saúde do Adulto II** — pesos somam 10:

| Item                         | Peso |
|------------------------------|-----:|
| OSCE (+0,5 de bônus, máx. 10)|   1  |
| Preceptoria                  |   1  |
| Prova do Módulo              |   2  |
| Tutorias                     |   3  |
| Seminários                   |   1  |
| BTCA Teórica (20 questões)   |   1  |
| BTCA Prática                 |   1  |

A Prova do Módulo (0–10) tem 24 fechadas (0,25 cada = 6) e 2 problemas abertos de 4 letras (0,5 por letra = 4): nota = acertos nas fechadas × 0,25 + abertas (ou a nota direta, pelo botão de alternância). A BTCA Teórica pode ser informada por nº de acertos (nota = acertos / 20 × 10) ou pela nota; os dois campos ficam sincronizados. Se a nota digitada não equivale a um nº inteiro de acertos, ela é mantida como está.

**CR da UC4** — soma dos pesos 17, sem usar carga horária:

| Item                              | Peso |
|-----------------------------------|-----:|
| CR anterior                       |  11  |
| Saúde da Mulher II (SM II)        |   1  |
| Saúde da Criança II (SC II)       |   1  |
| Saúde do Adulto II (SA II)        |   1  |
| Interação Comunitária IV (IC IV)  |   1  |
| Saúde e Sociedade II (SS II)    |   1  |
| Apoio Diagnóstico Terapêutico (ADT)  |   1  |

```
CR = (CR anterior × 11 + SM II + SC II + SA II + IC IV + SS II + ADT) / 17
```

SM II, SC II e SA II são preenchidas automaticamente pelas calculadoras; IC IV, SS II e ADT são digitadas direto (0–10). Campos vazios não valem zero: com média pendente o CR não é exibido, e com notas incompletas o resultado aparece como **CR projetado** (só é **CR** com tudo preenchido).

## Notas

- Interação Comunitária é sempre nota única, digitada diretamente no campo do CR.
- No UC3, a média do Adulto, Mulher e Criança é preenchida automaticamente ao calcular cada matéria; o mesmo vale para Locomotor/Neuro (UC1) e Cardio/Digest (UC2).
- O campo "CR Atual" é o CR acumulado **antes** do semestre em questão.

## Autoria

Feito por **Marco Túlio Amaral** (Namorado da Ana) e **Ana Amaral** — T76 Medicina UFMT.
