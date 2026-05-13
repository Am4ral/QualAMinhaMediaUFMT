# Calculadora Med UFMT

Calculadora web de médias e CR (Coeficiente de Rendimento) para estudantes de Medicina da UFMT. Suporta o cálculo dos três primeiros semestres do curso, com regras de peso específicas de cada UC (Unidade Curricular).

> Sistema de notas: **0 a 10**. Aprovado ≥ 7, Exame Final ≥ 5, Reprovado < 5.

## Recursos

- **1º Semestre (UC1)** — Locomotor + Neuro + Interação Comunitária
- **2º Semestre (UC2)** — Cardiorespiratório + Digestório & Urogenital + IC + Antropologia
- **3º Semestre (UC3)** — B.A.D., Saúde do Adulto I, Saúde da Mulher I, Saúde da Criança e do Adolescente + IC
- Cálculo em tempo real conforme as notas são digitadas
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

## Notas

- Interação Comunitária é sempre nota única, digitada diretamente no campo do CR.
- No UC3, a média do Adulto, Mulher e Criança é preenchida automaticamente ao calcular cada matéria; o mesmo vale para Locomotor/Neuro (UC1) e Cardio/Digest (UC2).
- O campo "CR Atual" é o CR acumulado **antes** do semestre em questão.

## Autoria

Feito por **Marco Túlio Amaral** (Namorado da Ana) e **Ana Amaral** — T76 Medicina UFMT.
