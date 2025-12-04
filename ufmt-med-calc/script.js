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

    // Navigation Logic
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            navButtons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const semester = btn.dataset.semester;
            semesterTitle.textContent = `${semester}º Semestre`;

            if (semester === '1') {
                semester1Content.style.display = 'block';
                semesterPlaceholder.style.display = 'none';
                // Trigger calc to refresh view
                calculateAverage();
            } else {
                semester1Content.style.display = 'none';
                semesterPlaceholder.style.display = 'block';
            }
        });
    });
});
