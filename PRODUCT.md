# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Alunos do curso de Medicina da UFMT, do 1º ao 12º semestre (UC1–UC12). Acessam quase sempre pelo celular — muitos pela Tela de Início do iPhone — para conferir se passaram quando sai uma nota, ou para descobrir quanto precisam tirar antes de uma prova.

## Product Purpose

Calcular a nota final de cada matéria e o CR do semestre seguindo exatamente os pesos e regras de cada UC, que mudam por semestre e por matéria. Sucesso é o aluno digitar as notas que já tem e saber na hora se está Aprovado, em Exame Final ou Reprovado.

## Positioning

É a única calculadora que segue a regra específica de cada matéria do curso (pesos, prova de módulo por número de acertos, questões abertas, CR por UC), mantida por quem está no curso e atualizada quando a turma avisa que a regra mudou.

## Operating Context

- Uso rápido e repetido no celular, normalmente logo depois de sair uma nota.
- As notas digitadas ficam salvas no navegador (`localStorage`); o iPhone apaga esse armazenamento após 7 dias sem abrir o site.
- As regras chegam por mensagem da turma e são transcritas em `Descricao.md`; algumas ainda são incertas (ex.: Prática de Saúde da Criança II, divisão de questões baseada na prova da turma passada).

## Capabilities and Constraints

- Site estático puro (HTML + CSS + JS, sem build), hospedado na Vercel com Vercel Web Analytics.
- Média ponderada por matéria; prova de módulo informada por nº de acertos ou nota direta (botão alterna); CR calculado a partir das matérias e de campos digitados (IC, Saúde e Sociedade, CR Atual).
- Escala de 0 a 10. Status: ≥ 7 Aprovado, ≥ 5 Exame Final, < 5 Reprovado.
- Semestres 1–4 implementados (4º parcial); 5–12 ainda "em breve".
- Botão "Limpar notas deste semestre" por semestre.

## Brand Commitments

- Projeto de aluno: não deve parecer oficial nem imitar a identidade da UFMT.
- Manter o crédito no rodapé: "Feito por: Marco Túlio Amaral (Namorado da Ana) e Ana Amaral T76."
- Manter os avisos da tela inicial: email para notas desatualizadas (tuliomtxe@gmail.com) e o aviso sobre o iPhone apagar notas salvas.
- Nome e ícones atuais não são obrigatórios.

## Evidence on Hand

- Regras de cada semestre em `Descricao.md` e `README.md`; planilha `Calculadora de notas UC3.xlsx`.
- Não há depoimentos, números de uso ou endosso oficial — não inventar.

## Product Principles

1. A regra certa vem antes de tudo: o cálculo tem de bater com o que a coordenação usa.
2. Respostas em segundos no celular: digitar uma nota e ver o status sem rolar nem procurar.
3. Ser honesto sobre incerteza: avisar quando uma regra é provisória ou baseada na turma anterior.
4. Feito por aluno, para aluno: tom próximo, sem fingir ser oficial.
