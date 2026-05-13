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

    // Média ponderada genérica: Σ(nota × peso) / Σ(peso)
    function weightedAverage(fields) {
        let score = 0;
        let totalPeso = 0;
        let allEmpty = true;
        for (const [id, w] of Object.entries(fields)) {
            const el = document.getElementById(id);
            const v = parseFloat(el.value);
            totalPeso += w;
            if (!isNaN(v)) {
                allEmpty = false;
                score += v * w;
            }
        }
        return { nota: allEmpty ? 0 : score / totalPeso, allEmpty };
    }

    // Pesos compartilhados de Introdução à Medicina (UC1 e UC2)
    const introMedFields = {
        anato: 1.0,
        histo: 0.5,
        modulo: 5,
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

        const cr = (
            (isNaN(loco) ? 0 : loco) +
            (isNaN(neuro) ? 0 : neuro) +
            (isNaN(ic) ? 0 : ic)
        ) / 3;

        resultEl.textContent = cr.toFixed(2);
        applyStatus(statusEl, cr);
    }

    ['loco-anato', 'loco-histo', 'loco-modulo', 'loco-seminario', 'loco-tutoria'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateLocomotor));
    ['neuro-anato', 'neuro-histo', 'neuro-modulo', 'neuro-seminario', 'neuro-tutoria'].forEach(id =>
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

        const cr = (
            (isNaN(crAtual) ? 0 : crAtual * 2) +
            (isNaN(ic) ? 0 : ic) +
            (isNaN(antro) ? 0 : antro) +
            (isNaN(cardio) ? 0 : cardio) +
            (isNaN(digest) ? 0 : digest)
        ) / 5;

        resultEl.textContent = cr.toFixed(2);
        applyStatus(statusEl, cr);
    }

    ['cardio-anato', 'cardio-histo', 'cardio-modulo', 'cardio-seminario', 'cardio-tutoria'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateCardio));
    ['digest-anato', 'digest-histo', 'digest-modulo', 'digest-seminario', 'digest-tutoria'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateDigest));
    ['uc2-cr-atual', 'uc2-cr-ic', 'uc2-cr-antro'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateCR_UC2));

    // ==========================================================
    // UC3 — 3º Semestre
    // CR = (CR_Atual×5 + BAD + IC + Adulto + Mulher + Criança) / 13
    // ==========================================================

    // B.A.D.: pesos somam 1.0, fórmula = Σ(peso × nota)
    function calculateBAD() {
        const fields = {
            'bad-parasitologia': 0.225,
            'bad-virologia': 0.1,
            'bad-imunologia': 0.225,
            'bad-patologia': 0.225,
            'bad-microbiologia': 0.225
        };
        let score = 0;
        let allEmpty = true;
        for (const [id, w] of Object.entries(fields)) {
            const v = parseFloat(document.getElementById(id).value);
            if (!isNaN(v)) { allEmpty = false; score += v * w; }
        }
        setSubjectResult('bad-result', 'bad-status', 'cr-bad', score, allEmpty);
        calculateCR_UC3();
    }

    // Saúde do Adulto I: pesos base somam 10; extra opcional +0.5
    function calculateAdulto() {
        const fields = {
            'adulto-osce': 1.25,
            'adulto-praticas-he': 1.25,
            'adulto-tutoria-media': 2.5,
            'adulto-seminario': 1,
            'adulto-modulo': 4
        };
        let score = 0;
        let totalPeso = 10;
        let allEmpty = true;
        for (const [id, w] of Object.entries(fields)) {
            const v = parseFloat(document.getElementById(id).value);
            if (!isNaN(v)) { allEmpty = false; score += v * w; }
        }
        if (document.getElementById('adulto-extra').checked) {
            allEmpty = false;
            score += 10 * 0.5;
            totalPeso += 0.5;
        }
        const nota = allEmpty ? 0 : score / totalPeso;
        setSubjectResult('adulto-result', 'adulto-status', 'cr-adulto', nota, allEmpty);
        calculateCR_UC3();
    }

    function calculateMulher() {
        const { nota, allEmpty } = weightedAverage({
            'mulher-pratica': 2,
            'mulher-tutoria-media': 2.5,
            'mulher-seminario': 1,
            'mulher-modulo': 4,
            'mulher-psicologia': 0.5
        });
        setSubjectResult('mulher-result', 'mulher-status', 'cr-mulher', nota, allEmpty);
        calculateCR_UC3();
    }

    function calculateCrianca() {
        const { nota, allEmpty } = weightedAverage({
            'crianca-tutoria-media': 3,
            'crianca-seminario': 1,
            'crianca-modulo': 4.5,
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
        const adulto = parseFloat(document.getElementById('cr-adulto').value);
        const mulher = parseFloat(document.getElementById('cr-mulher').value);
        const crianca = parseFloat(document.getElementById('cr-crianca').value);

        const resultEl = document.getElementById('cr-result');
        const statusEl = document.getElementById('cr-status');

        const allEmpty = [crAtual, bad, ic, adulto, mulher, crianca].every(v => isNaN(v));
        if (allEmpty) {
            resetResult(resultEl, statusEl);
            return;
        }

        const cr = (
            (isNaN(crAtual) ? 0 : crAtual * 5) +
            (isNaN(bad) ? 0 : bad) +
            (isNaN(ic) ? 0 : ic) +
            (isNaN(adulto) ? 0 : adulto) +
            (isNaN(mulher) ? 0 : mulher) +
            (isNaN(crianca) ? 0 : crianca)
        ) / 13;

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
    ['cr-atual', 'cr-ic'].forEach(id =>
        document.getElementById(id).addEventListener('input', calculateCR_UC3));

    // ==========================================================
    // Navegação
    // ==========================================================
    const navButtons = document.querySelectorAll('.nav-btn');
    const semesterTitle = document.getElementById('semester-title');
    const semester1Content = document.getElementById('semester-1-content');
    const semester2Content = document.getElementById('semester-2-content');
    const semester3Content = document.getElementById('semester-3-content');
    const semesterPlaceholder = document.getElementById('semester-placeholder');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const semester = btn.dataset.semester;
            semesterTitle.textContent = `${semester}º Semestre`;

            semester1Content.style.display = 'none';
            semester2Content.style.display = 'none';
            semester3Content.style.display = 'none';
            semesterPlaceholder.style.display = 'none';

            if (semester === '1') {
                semester1Content.style.display = 'block';
                calculateLocomotor();
                calculateNeuro();
            } else if (semester === '2') {
                semester2Content.style.display = 'block';
                calculateCardio();
                calculateDigest();
            } else if (semester === '3') {
                semester3Content.style.display = 'block';
                calculateBAD();
                calculateAdulto();
                calculateMulher();
                calculateCrianca();
            } else {
                semesterPlaceholder.style.display = 'block';
            }
        });
    });

    // Inicialização
    calculateLocomotor();
    calculateNeuro();
});
