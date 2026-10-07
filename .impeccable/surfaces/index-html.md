---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["style.css","script.js"]
---

# Calculadora (index.html)

Scope: the whole single-page calculator (home + semesters 1–12). Mode: Operate.
Task: a med student on a phone types the grades they have and instantly sees each matéria's final grade and status (Aprovado ≥7 / Exame Final ≥5 / Reprovado), plus the semester CR.
Must stay: every calculation, input id, localStorage behaviour, home notices, footer credit. Avoid: generic SaaS, childish, official-UFMT look, extra taps.
Constraints: static HTML/CSS/JS, no build; light only (paper in daylight / classroom).

## Direction contract

THESIS: Each matéria is one line of an answer sheet: the student fills the fields, the calculator fills the A / E / R bubble. Refuses the default of white cards with a coloured status pill.

OWN-WORLD: OMR cartão-resposta. White sheets on a faint salmon ground; dropout salmon ink (#e0643f) for every printed structure: rules, field boxes, bubble outlines, condensed caps labels (Archivo, wdth 75). Ink black (#1a1614) for anything the student or the calculator "marks": typed values, filled bubbles, black timing marks. Status colour (green / amber / crimson) reserved only for status. Corners small, paper-like.

STORY: Open a semester → the gabarito-resumo shows every matéria + CR with nota and filled bubble → tap a line → its fields → type → bubble refills.

FIRST VIEWPORT: Mobile: salmon band with app name and numbered semester bubbles (scrolls horizontally); below, the gabarito-resumo sheet (timing mark, name, nota, A E R per row, CR row last); first matéria sheet starts beneath. Desktop: salmon rail left with numbered bubbles; gabarito-resumo top of main column, matéria sheets in a two-column grid.

FORM: Cartão-Resposta, candidate 3 of 7 (laudo, Manchester, gabarito, resumo, carimbo, Anki, atlas). Seed fbfe7ec9. Signature: status as the filled bubble; acertos fields draw a live bubble strip. Raises: 0–10 rule with 5/7 marks under each result (rail); weights shown closing at 10 (j-card); state changes are steps(2) 90ms, no easing (acetate); semesters with saved notes marked on home (catalog).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
