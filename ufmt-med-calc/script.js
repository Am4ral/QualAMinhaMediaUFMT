document.addEventListener('DOMContentLoaded', () => {
    // Weights configuration
    const weights = {
        tutoria: 2.5,
        pratica1: 0.5,
        pratica2: 0.5,
        praticaHisto: 0.5,
        apresSem: 0.7,
        banner: 0.3,
        modulo: 5.0, // Special case: grade is out of 50, so we normalize
        antropologia: 1.0,
        ic: 1.0
    };

    // DOM Elements
    const inputs = {
        tutoria: document.getElementById('tutoria'),
        pratica1: document.getElementById('pratica1'),
        pratica2: document.getElementById('pratica2'),
        praticaHisto: document.getElementById('praticaHisto'),
        apresSem: document.getElementById('apresSem'),
        banner: document.getElementById('banner'),
        modulo: document.getElementById('modulo'),
        antropologia: document.getElementById('antropologia'),
        ic: document.getElementById('ic')
    };

    const finalResultEl = document.getElementById('final-result');
    const resultStatusEl = document.getElementById('result-status');
    const navButtons = document.querySelectorAll('.nav-btn');
    const semesterTitle = document.getElementById('semester-title');
    const semester1Content = document.getElementById('semester-1-content');
    const semester3Content = document.getElementById('semester-3-content');
    const semesterPlaceholder = document.getElementById('semester-placeholder');

    // Calculate Average Function
    function calculateAverage() {
        let totalScore = 0;
        let allEmpty = true;
        let totalWeight = 0;

        // Calculate total weight dynamically
        Object.values(weights).forEach(w => totalWeight += w);

        // Helper to get value and apply weight
        const getValue = (id, weight, maxScore = 10) => {
            const val = parseFloat(inputs[id].value);
            if (isNaN(val)) return 0;
            allEmpty = false;

            // Normalize to 0-10 scale
            const normalizedValue = (val / maxScore) * 10;
            // Contribution to the weighted average
            return normalizedValue * weight;
        };

        totalScore += getValue('tutoria', weights.tutoria);
        totalScore += getValue('pratica1', weights.pratica1);
        totalScore += getValue('pratica2', weights.pratica2);
        totalScore += getValue('praticaHisto', weights.praticaHisto);
        totalScore += getValue('apresSem', weights.apresSem);
        totalScore += getValue('banner', weights.banner);
        totalScore += getValue('modulo', weights.modulo, 50); // Max score 50
        totalScore += getValue('antropologia', weights.antropologia);
        totalScore += getValue('ic', weights.ic);

        // Calculate weighted average
        // Formula: Sum(Value * Weight) / Sum(Weights)
        const finalAverage = totalScore / totalWeight;

        if (allEmpty) {
            finalResultEl.textContent = "0.00";
            resultStatusEl.textContent = "Aguardando notas...";
            resultStatusEl.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        } else {
            finalResultEl.textContent = finalAverage.toFixed(2);

            if (finalAverage >= 7) {
                resultStatusEl.textContent = "Aprovado!";
                resultStatusEl.style.backgroundColor = "#27ae60"; // Green
            } else if (finalAverage >= 5) {
                resultStatusEl.textContent = "Exame Final";
                resultStatusEl.style.backgroundColor = "#f39c12"; // Orange
            } else {
                resultStatusEl.textContent = "Reprovado";
                resultStatusEl.style.backgroundColor = "#c0392b"; // Red
            }
        }
    }

    // Event Listeners for Inputs
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', calculateAverage);
    });

    // UC3 helpers
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

    function setSubjectResult(resultId, statusId, crInputId, nota, allEmpty) {
        const resultEl = document.getElementById(resultId);
        const statusEl = document.getElementById(statusId);
        const crInput = crInputId ? document.getElementById(crInputId) : null;

        if (allEmpty) {
            resultEl.textContent = '0.00';
            statusEl.textContent = 'Aguardando notas...';
            statusEl.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            if (crInput) crInput.value = '';
        } else {
            resultEl.textContent = nota.toFixed(2);
            applyStatus(statusEl, nota);
            if (crInput) crInput.value = nota.toFixed(2);
        }
    }

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
        calculateCR();
    }

    // Saúde do Adulto I: pesos base somam 10; extra opcional +0.5
    // nota = Σ(nota × peso) / total_peso
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
        calculateCR();
    }

    // Saúde da Mulher I: pesos somam 10
    function calculateMulher() {
        const fields = {
            'mulher-pratica': 2,
            'mulher-tutoria-media': 2.5,
            'mulher-seminario': 1,
            'mulher-modulo': 4,
            'mulher-psicologia': 0.5
        };
        let score = 0;
        let allEmpty = true;
        for (const [id, w] of Object.entries(fields)) {
            const v = parseFloat(document.getElementById(id).value);
            if (!isNaN(v)) { allEmpty = false; score += v * w; }
        }
        const nota = allEmpty ? 0 : score / 10;
        setSubjectResult('mulher-result', 'mulher-status', 'cr-mulher', nota, allEmpty);
        calculateCR();
    }

    // Saúde da Criança e do Adolescente: pesos somam 10
    function calculateCrianca() {
        const fields = {
            'crianca-tutoria-media': 3,
            'crianca-seminario': 1,
            'crianca-modulo': 4.5,
            'crianca-relatorio': 1,
            'crianca-psicologia': 0.5
        };
        let score = 0;
        let allEmpty = true;
        for (const [id, w] of Object.entries(fields)) {
            const v = parseFloat(document.getElementById(id).value);
            if (!isNaN(v)) { allEmpty = false; score += v * w; }
        }
        const nota = allEmpty ? 0 : score / 10;
        setSubjectResult('crianca-result', 'crianca-status', 'cr-crianca', nota, allEmpty);
        calculateCR();
    }

    // CR = (CR_Atual × 5 + BAD + IC + Adulto + Mulher + Criança) / 13
    function calculateCR() {
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
            resultEl.textContent = '0.00';
            statusEl.textContent = 'Aguardando notas...';
            statusEl.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
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

    // UC3 Event Listeners
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
        document.getElementById(id).addEventListener('input', calculateCR));

    // Navigation Logic
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            navButtons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const semester = btn.dataset.semester;
            semesterTitle.textContent = `${semester}º Semestre`;

            semester1Content.style.display = 'none';
            semester3Content.style.display = 'none';
            semesterPlaceholder.style.display = 'none';

            if (semester === '1') {
                semester1Content.style.display = 'block';
                calculateAverage();
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
});
