document.addEventListener('DOMContentLoaded', () => {
    // ---------- Helpers ----------
    function applyStatus(statusEl, nota) {
        if (nota >= 7) {
            statusEl.textContent = 'Aprovado!';
            statusEl.style.backgroundColor = '#27ae60';
        } else if (nota >= 5) {
            statusEl.textContent = 'Exame Final';
            statusEl.style.backgroundColor = '#f39c12';
        } else {
            statusEl.textContent = 'Reprovado';
            statusEl.style.backgroundColor = '#c0392b';
        }
    }

    function resetResult(resultEl, statusEl) {
        resultEl.textContent = '0.00';
        statusEl.textContent = 'Aguardando notas...';
        statusEl.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    }

    function setSubjectResult(resultId, statusId, crInputId, nota, allEmpty) {
        const resultEl = document.getElementById(resultId);
        const statusEl = document.getElementById(statusId);
        const crInput = crInputId ? document.getElementById(crInputId) : null;

        if (allEmpty) {
            resetResult(resultEl, statusEl);
            if (crInput) crInput.value = '';
        } else {
            resultEl.textContent = nota.toFixed(2);
            applyStatus(statusEl, nota);
            if (crInput) crInput.value = nota.toFixed(2);
        }
    }

    // Média ponderada genérica: Σ(nota_normalizada × peso) / Σ(peso)
    // Aceita peso simples (número) ou objeto { weight, max } — quando max != 10, normaliza para escala 0-10.
    function weightedAverage(fields) {
        let score = 0;
        let totalPeso = 0;
        let allEmpty = true;
        for (const [id, def] of Object.entries(fields)) {
            const weight = typeof def === 'number' ? def : def.weight;
            const max = typeof def === 'number' ? 10 : (def.max ?? 10);
            const v = parseFloat(document.getElementById(id).value);
            totalPeso += weight;
            if (!isNaN(v)) {
                allEmpty = false;
                const normalized = (v / max) * 10;
                score += normalized * weight;
            }
        }
        return { nota: allEmpty ? 0 : score / totalPeso, allEmpty };
    }

    // Pesos compartilhados de Introdução à Medicina (UC1 e UC2)
    // Módulo: prova de 50 questões — o aluno informa acertos e normalizamos para 0-10
    const introMedFields = {
        anato1: 0.5,
        anato2: 0.5,
        histo: 0.5,
        modulo: { weight: 5, max: 50 },
        seminario: 1,
        tutoria: 2.5
    };

    // Calcula a média de uma matéria com pesos de Introdução à Medicina
    function calculateIntroMedSubject(prefix, resultId, statusId, crInputId, onUpdate) {
        const fields = {};
        for (const [suffix, w] of Object.entries(introMedFields)) {
            fields[`${prefix}-${suffix}`] = w;
        }
        const { nota, allEmpty } = weightedAverage(fields);
        setSubjectResult(resultId, statusId, crInputId, nota, allEmpty);
        onUpdate();
    }

    // ==========================================================
    // UC1 — 1º Semestre
    // CR = (Locomotor + Neuro + IC) / 3
    // ==========================================================
    function calculateLocomotor() {
        calculateIntroMedSubject('loco', 'loco-result', 'loco-status', 'uc1-cr-loco', calculateCR_UC1);
    }
    function calculateNeuro() {
        calculateIntroMedSubject('neuro', 'neuro-result', 'neuro-status', 'uc1-cr-neuro', calculateCR_UC1);
    }

    function calculateCR_UC1() {
        const loco = parseFloat(document.getElementById('uc1-cr-loco').value);
        const neuro = parseFloat(document.getElementById('uc1-cr-neuro').value);
        const ic = parseFloat(document.getElementById('uc1-cr-ic').value);

        const resultEl = document.getElementById('uc1-cr-result');
        const statusEl = document.getElementById('uc1-cr-status');

        const allEmpty = [loco, neuro, ic].every(v => isNaN(v));
        if (allEmpty) {
            resetResult(resultEl, statusEl);
            return;
        }

        const locoV = isNaN(loco) ? 0 : loco;
        const neuroV = isNaN(neuro) ? 0 : neuro;
        const icV = isNaN(ic) ? 0 : ic;
        const cr = ((locoV + neuroV) / 2 + icV) / 2;

        resultEl.textContent = cr.toFixed(2);
        applyStatus(statusEl, cr);
    }

    ['loco-anato1', 'loco-anato2', 'loco-histo', 'loco-modulo', 'loco-seminario', 'loco-tutoria'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateLocomotor));
    ['neuro-anato1', 'neuro-anato2', 'neuro-histo', 'neuro-modulo', 'neuro-seminario', 'neuro-tutoria'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateNeuro));
    document.getElementById('uc1-cr-ic').addEventListener('input', calculateCR_UC1);

    // ==========================================================
    // UC2 — 2º Semestre
    // CR = (CR_Atual×2 + IC + Antro + Cardio + Digest) / 5
    // ==========================================================
    function calculateCardio() {
        calculateIntroMedSubject('cardio', 'cardio-result', 'cardio-status', 'uc2-cr-cardio', calculateCR_UC2);
    }
    function calculateDigest() {
        calculateIntroMedSubject('digest', 'digest-result', 'digest-status', 'uc2-cr-digest', calculateCR_UC2);
    }

    function calculateCR_UC2() {
        const crAtual = parseFloat(document.getElementById('uc2-cr-atual').value);
        const ic = parseFloat(document.getElementById('uc2-cr-ic').value);
        const antro = parseFloat(document.getElementById('uc2-cr-antro').value);
        const cardio = parseFloat(document.getElementById('uc2-cr-cardio').value);
        const digest = parseFloat(document.getElementById('uc2-cr-digest').value);

        const resultEl = document.getElementById('uc2-cr-result');
        const statusEl = document.getElementById('uc2-cr-status');

        const allEmpty = [crAtual, ic, antro, cardio, digest].every(v => isNaN(v));
        if (allEmpty) {
            resetResult(resultEl, statusEl);
            return;
        }

        const cardioV = isNaN(cardio) ? 0 : cardio;
        const digestV = isNaN(digest) ? 0 : digest;
        const mediaIntroMed = (cardioV + digestV) / 2;

        const cr = (
            (isNaN(crAtual) ? 0 : crAtual * 2) +
            (isNaN(ic) ? 0 : ic) +
            (isNaN(antro) ? 0 : antro) +
            mediaIntroMed
        ) / 5;

        resultEl.textContent = cr.toFixed(2);
        applyStatus(statusEl, cr);
    }

    ['cardio-anato1', 'cardio-anato2', 'cardio-histo', 'cardio-modulo', 'cardio-seminario', 'cardio-tutoria'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateCardio));
    ['digest-anato1', 'digest-anato2', 'digest-histo', 'digest-modulo', 'digest-seminario', 'digest-tutoria'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateDigest));
    ['uc2-cr-atual', 'uc2-cr-ic', 'uc2-cr-antro'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateCR_UC2));

    // ==========================================================
    // UC3 — 3º Semestre
    // CR = (CR_Atual×5 + BAD + IC + Saúde e Sociedade + Adulto + Mulher + Criança) / 11
    // ==========================================================

    // B.A.D.: pesos somam 10 — média ponderada padrão
    function calculateBAD() {
        const { nota, allEmpty } = weightedAverage({
            'bad-virologia': 1,
            'bad-parasitologia': 2.25,
            'bad-imunologia': 2.25,
            'bad-patologia': 2.25,
            'bad-microbiologia': 2.25
        });
        setSubjectResult('bad-result', 'bad-status', 'cr-bad', nota, allEmpty);
        calculateCR_UC3();
    }

    // Saúde do Adulto I — pesos somam 10
    // Prática (peso 2.5) = ((OSCE + bônus monitorias) + Hospital) / 2
    function calculateAdulto() {
        const osce = parseFloat(document.getElementById('adulto-osce').value);
        const hosp = parseFloat(document.getElementById('adulto-praticas-he').value);
        const tutoria = parseFloat(document.getElementById('adulto-tutoria-media').value);
        const seminario = parseFloat(document.getElementById('adulto-seminario').value);
        const moduloAcertos = parseFloat(document.getElementById('adulto-modulo').value);
        const extra = document.getElementById('adulto-extra').checked;

        const allEmpty = [osce, hosp, tutoria, seminario, moduloAcertos].every(v => isNaN(v)) && !extra;

        const osceComBonus = (isNaN(osce) ? 0 : osce) + (extra ? 0.5 : 0);
        const hospV = isNaN(hosp) ? 0 : hosp;
        const pratica = (osceComBonus + hospV) / 2;

        const tutoriaV = isNaN(tutoria) ? 0 : tutoria;
        const seminarioV = isNaN(seminario) ? 0 : seminario;
        const moduloNota = isNaN(moduloAcertos) ? 0 : (moduloAcertos / 25) * 10;

        // Σ(nota × peso) / 10
        const nota = (pratica * 2.5 + tutoriaV * 2.5 + seminarioV * 1 + moduloNota * 4) / 10;

        setSubjectResult('adulto-result', 'adulto-status', 'cr-adulto', nota, allEmpty);
        calculateCR_UC3();
    }

    function calculateMulher() {
        const { nota, allEmpty } = weightedAverage({
            'mulher-pratica': 2,
            'mulher-tutoria-media': 2.5,
            'mulher-seminario': 1,
            'mulher-modulo': { weight: 4, max: 20 },
            'mulher-psicologia': 0.5
        });
        setSubjectResult('mulher-result', 'mulher-status', 'cr-mulher', nota, allEmpty);
        calculateCR_UC3();
    }

    function calculateCrianca() {
        const { nota, allEmpty } = weightedAverage({
            'crianca-tutoria-media': 3,
            'crianca-seminario': 1,
            'crianca-modulo': { weight: 4.5, max: 20 },
            'crianca-relatorio': 1,
            'crianca-psicologia': 0.5
        });
        setSubjectResult('crianca-result', 'crianca-status', 'cr-crianca', nota, allEmpty);
        calculateCR_UC3();
    }

    function calculateCR_UC3() {
        const crAtual = parseFloat(document.getElementById('cr-atual').value);
        const bad = parseFloat(document.getElementById('cr-bad').value);
        const ic = parseFloat(document.getElementById('cr-ic').value);
        const sesoc = parseFloat(document.getElementById('cr-sesoc').value);
        const adulto = parseFloat(document.getElementById('cr-adulto').value);
        const mulher = parseFloat(document.getElementById('cr-mulher').value);
        const crianca = parseFloat(document.getElementById('cr-crianca').value);

        const resultEl = document.getElementById('cr-result');
        const statusEl = document.getElementById('cr-status');

        const allEmpty = [crAtual, bad, ic, sesoc, adulto, mulher, crianca].every(v => isNaN(v));
        if (allEmpty) {
            resetResult(resultEl, statusEl);
            return;
        }

        const cr = (
            (isNaN(crAtual) ? 0 : crAtual * 5) +
            (isNaN(bad) ? 0 : bad) +
            (isNaN(ic) ? 0 : ic) +
            (isNaN(sesoc) ? 0 : sesoc) +
            (isNaN(adulto) ? 0 : adulto) +
            (isNaN(mulher) ? 0 : mulher) +
            (isNaN(crianca) ? 0 : crianca)
        ) / 11;

        resultEl.textContent = cr.toFixed(2);
        applyStatus(statusEl, cr);
    }

    ['bad-parasitologia', 'bad-virologia', 'bad-imunologia', 'bad-patologia', 'bad-microbiologia'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateBAD));
    ['adulto-osce', 'adulto-praticas-he', 'adulto-tutoria-media', 'adulto-seminario', 'adulto-modulo'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateAdulto));
    document.getElementById('adulto-extra').addEventListener('change', calculateAdulto);
    ['mulher-pratica', 'mulher-tutoria-media', 'mulher-seminario', 'mulher-modulo', 'mulher-psicologia'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateMulher));
    ['crianca-tutoria-media', 'crianca-seminario', 'crianca-modulo', 'crianca-relatorio', 'crianca-psicologia'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateCrianca));
    ['cr-atual', 'cr-ic', 'cr-sesoc'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateCR_UC3));

    // ==========================================================
    // UC4 — 4º Semestre
    // Demais matérias e CR em construção
    // ==========================================================

    // Saúde da Mulher II — pesos somam 10: Seminário 1.5 + Tutoria 3.5 + Prova de Módulo 5
    // Prova (0-10): 20 fechadas (0.4 cada = 8 pontos, peso 4) + 2 abertas (1 ponto cada = 2 pontos, peso 1)
    // O botão alterna entre informar acertos + abertas ou a nota da prova direto
    let mulher2Mode = 'acertos';

    function getMulher2Prova() {
        if (mulher2Mode === 'nota') {
            return parseFloat(document.getElementById('mulher2-prova').value);
        }
        const acertos = parseFloat(document.getElementById('mulher2-fechadas').value);
        const abertas = parseFloat(document.getElementById('mulher2-abertas').value);
        if (isNaN(acertos) && isNaN(abertas)) return NaN;
        return (isNaN(acertos) ? 0 : acertos * 0.4) + (isNaN(abertas) ? 0 : abertas);
    }

    function calculateMulher2() {
        const seminario = parseFloat(document.getElementById('mulher2-seminario').value);
        const tutoria = parseFloat(document.getElementById('mulher2-tutoria').value);
        const prova = getMulher2Prova();

        document.getElementById('mulher2-prova-preview').textContent = isNaN(prova) ? '—' : prova.toFixed(2);

        const allEmpty = [seminario, tutoria, prova].every(v => isNaN(v));

        // Σ(nota × peso) / 10
        const nota = (
            (isNaN(seminario) ? 0 : seminario) * 1.5 +
            (isNaN(tutoria) ? 0 : tutoria) * 3.5 +
            (isNaN(prova) ? 0 : prova) * 5
        ) / 10;

        setSubjectResult('mulher2-result', 'mulher2-status', null, nota, allEmpty);
    }

    function setMulher2Mode(mode) {
        mulher2Mode = mode;
        document.querySelectorAll('#mulher2-mode-toggle .mode-btn').forEach(btn => {
            const active = btn.dataset.mode === mode;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active);
        });
        document.querySelectorAll('[data-mulher2-mode]').forEach(el => {
            el.style.display = el.dataset.mulher2Mode === mode ? '' : 'none';
        });
        calculateMulher2();
    }

    document.querySelectorAll('#mulher2-mode-toggle .mode-btn').forEach(btn =>
        btn.addEventListener('click', () => {
            setMulher2Mode(btn.dataset.mode);
            saveGrades();
        }));
    ['mulher2-seminario', 'mulher2-tutoria', 'mulher2-fechadas', 'mulher2-abertas', 'mulher2-prova'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateMulher2));

    // Recalcula todas as matérias (e o CR) de cada semestre
    const semesterCalculators = {
        '1': () => { calculateLocomotor(); calculateNeuro(); },
        '2': () => { calculateCardio(); calculateDigest(); },
        '3': () => { calculateBAD(); calculateAdulto(); calculateMulher(); calculateCrianca(); },
        '4': () => calculateMulher2()
    };

    // ==========================================================
    // Salvamento das notas no navegador (localStorage)
    // Guarda os campos digitáveis por id — os campos "Automático" são recalculados
    // ==========================================================
    const STORAGE_KEY = 'calculadora-med-ufmt:notas:v1';

    function editableInputs(scope = document) {
        return scope.querySelectorAll('.uc-form input:not([readonly])');
    }

    function saveGrades() {
        const values = {};
        editableInputs().forEach(input => {
            if (input.type === 'checkbox') {
                if (input.checked) values[input.id] = true;
            } else if (input.value !== '') {
                values[input.id] = input.value;
            }
        });
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, mulher2Mode }));
        } catch (e) {
            // Armazenamento indisponível (ex.: aba anônima) — a calculadora segue funcionando
        }
    }

    function restoreGrades() {
        let data;
        try {
            data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch (e) {
            return;
        }
        if (!data || !data.values) return;

        editableInputs().forEach(input => {
            const saved = data.values[input.id];
            if (saved === undefined) return;
            if (input.type === 'checkbox') {
                input.checked = saved === true;
            } else {
                input.value = saved;
            }
        });
        if (data.mulher2Mode === 'nota') setMulher2Mode('nota');
    }

    const contentArea = document.querySelector('.content-area');
    contentArea.addEventListener('input', saveGrades);
    contentArea.addEventListener('change', saveGrades);

    // Botão "Limpar notas deste semestre"
    document.querySelectorAll('[data-clear-semester]').forEach(btn => {
        btn.addEventListener('click', () => {
            const semester = btn.dataset.clearSemester;
            if (!confirm(`Apagar todas as notas do ${semester}º semestre?`)) return;

            editableInputs(document.getElementById(`semester-${semester}-content`)).forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
            semesterCalculators[semester]();
            saveGrades();
        });
    });

    // ==========================================================
    // Navegação
    // ==========================================================
    const navButtons = document.querySelectorAll('.nav-btn');
    const semesterTitle = document.getElementById('semester-title');
    const homeContent = document.getElementById('home-content');
    const semesterPlaceholder = document.getElementById('semester-placeholder');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            btn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            contentArea.scrollTop = 0;

            const semester = btn.dataset.semester;
            semesterTitle.textContent = semester === 'home' ? 'Início' : `${semester}º Semestre`;

            document.querySelectorAll('.semester-content').forEach(el => el.style.display = 'none');

            if (semester === 'home') {
                homeContent.style.display = 'block';
            } else if (semesterCalculators[semester]) {
                document.getElementById(`semester-${semester}-content`).style.display = 'block';
                semesterCalculators[semester]();
            } else {
                semesterPlaceholder.style.display = 'block';
            }
        });
    });

    // Cards da página inicial levam ao semestre correspondente
    document.querySelectorAll('.home-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelector(`.nav-btn[data-semester="${card.dataset.semester}"]`).click();
        });
    });

    // Inicialização: restaura as notas salvas e recalcula tudo
    restoreGrades();
    Object.values(semesterCalculators).forEach(calculate => calculate());
});
