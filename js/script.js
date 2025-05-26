document.addEventListener('DOMContentLoaded', () => {
    // Variables globales
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const homeLink = document.getElementById('home-link');
    const chartFontColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--futuristic-text-dark').trim();
    const chartGridColor = 'rgba(100, 116, 139, 0.2)';

    // Datos de riesgos estáticos
    const risksData = [
        {
            risk: "Baja adopción de servicios integrados por PYMES locales.",
            mitigation: "Fuerte estrategia de marketing y talleres. Auditorías iniciales a bajo costo."
        },
        {
            risk: "Entrada de un competidor fuerte a la región.",
            mitigation: "Fidelizar clientes con servicio excepcional y marca sólida."
        },
        {
            risk: "Pérdida de personal técnico clave.",
            mitigation: "Ambiente laboral positivo, capacitación y documentación de procesos."
        },
        {
            risk: "Brecha de seguridad en infraestructura.",
            mitigation: "Medidas de seguridad internas, plan de respuesta a incidentes, seguro profesional."
        },
        {
            risk: "Problemas de flujo de caja por retrasos de pago.",
            mitigation: "Políticas claras de anticipo (50%), contratos retainer mensual."
        }
    ];

    // Función para cambiar sección activa
    function setActiveSection(hash) {
        const target = hash || '#inicio';
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === target);
        });
        sections.forEach(sec => {
            sec.classList.toggle('active', '#' + sec.id === target);
        });
        window.scrollTo(0, 0);
    }

    // Eventos de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const h = link.getAttribute('href');
            setActiveSection(h);
            history.pushState(null, '', h);
        });
    });
    homeLink.addEventListener('click', e => {
        e.preventDefault();
        setActiveSection('#inicio');
        history.pushState(null, '', '#inicio');
    });

    // Inicializar acordeones
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const arrow = header.querySelector('.arrow');
            const open = content.style.maxHeight && content.style.maxHeight !== '0px';
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = '0px');
            document.querySelectorAll('.accordion-header .arrow').forEach(a => a.style.transform = 'rotate(0deg)');
            if (!open) {
                content.style.maxHeight = content.scrollHeight + 'px';
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Renderizar lista de riesgos
    const riskList = document.getElementById('risk-list');
    risksData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'risk-item border border-slate-300 rounded-md mb-2';
        div.innerHTML = `
        <button class="w-full text-left p-3 font-medium hover:bg-futuristic-bg-light flex justify-between">
          <span>${item.risk}</span>
          <span class="text-sm text-futuristic-secondary">&#9662; Ver mitigación</span>
        </button>
        <div class="risk-item-mitigation p-3 border-t border-slate-300 text-sm">${item.mitigation}</div>
      `;
        div.querySelector('button').addEventListener('click', () => {
            const mit = div.querySelector('.risk-item-mitigation');
            const arrowSpan = div.querySelector('button span:last-child');
            const visible = mit.style.display === 'block';
            mit.style.display = visible ? 'none' : 'block';
            arrowSpan.innerHTML = visible ? '&#9662; Ver mitigación' : '&#9652; Ocultar mitigación';
        });
        riskList.append(div);
    });

    // Función genérica para gráficos Chart.js
    function createChart(ctx, config) {
        new Chart(ctx, config);
    }

    // Gráfico de inversión (doughnut)
    const invCtx = document.getElementById('inversionChart')?.getContext('2d');
    if (invCtx) {
        createChart(invCtx, {
            type: 'doughnut',
            data: { labels: ['Activos Fijos', 'Intangibles', 'Capital de Trabajo'], datasets: [{ data: [25e6, 15e6, 45e6], backgroundColor: ['#00C9D1', '#A020F0', '#0A2A4D'], borderColor: getComputedStyle(document.documentElement).getPropertyValue('--futuristic-card-bg').trim(), borderWidth: 2, hoverOffset: 8 }] },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { font: { family: 'Inter', size: 10 }, color: chartFontColor } },
                    tooltip: { bodyFont: { family: 'Inter' }, titleFont: { family: 'Inter' }, callbacks: { label: ctx => `${ctx.label}: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(ctx.parsed)}` } }
                }
            }
        });
    }

    // Gráfico de ingresos proyectados (barras)
    const ingresosCtx = document.getElementById('ingresosChart')?.getContext('2d');
    if (ingresosCtx) {
        createChart(ingresosCtx, {
            type: 'bar',
            data: {
                labels: ['Año 1', 'Año 2', 'Año 3'],
                datasets: [{
                    label: 'Ingresos Proyectados (Millones COP)',
                    data: [350, 750, 1200],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(59, 130, 246, 0.6)',
                        'rgba(59, 130, 246, 0.4)'
                    ],
                    borderColor: [
                        'rgba(59, 130, 246, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(59, 130, 246, 1)'
                    ],
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        bodyFont: {
                            family: 'Inter'
                        },
                        titleFont: {
                            family: 'Inter'
                        },
                        callbacks: {
                            label: function (context) {
                                return `Ingresos: ${new Intl.NumberFormat('es-CO', {
                                    style: 'currency',
                                    currency: 'COP',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(context.raw * 1000000)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: chartGridColor
                        },
                        ticks: {
                            color: chartFontColor,
                            font: {
                                family: 'Inter'
                            },
                            callback: function (value) {
                                return `$${value}M`;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: chartFontColor,
                            font: {
                                family: 'Inter'
                            }
                        }
                    }
                }
            }
        });
    }

    const mercadoCtx = document.getElementById('mercadoChart')?.getContext('2d');
    if (mercadoCtx) {
        new Chart(mercadoCtx, {
            type: 'bar',
            data: {
                labels: ['PYMES Activas (Córdoba)', 'Crecimiento Proyectado TI (Anual %)'],
                datasets: [{
                    label: 'Estimación de Mercado',
                    data: [3000, 15],
                    backgroundColor: [getComputedStyle(document.documentElement).getPropertyValue('--futuristic-primary').trim(), getComputedStyle(document.documentElement).getPropertyValue('--futuristic-secondary').trim()],
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: chartGridColor },
                        ticks: {
                            color: chartFontColor, font: { family: 'Inter' },
                            callback: function (value, index, values) {
                                if (index === 1) return value + '%';
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: chartFontColor, font: { family: 'Inter' } }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        bodyFont: { family: 'Inter' },
                        titleFont: { family: 'Inter' },
                        callbacks: {
                            label: function (tooltipContext) {
                                let label = tooltipContext.dataset.label || '';
                                if (label) { label += ': '; }
                                if (tooltipContext.parsed.y !== null) {
                                    if (tooltipContext.label.includes('%')) {
                                        label += tooltipContext.parsed.y + '%';
                                    } else {
                                        label += tooltipContext.parsed.y;
                                    }
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // Año en el footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // === LÓGICA DE GEMINI (Prompts IA) ===

    // Función para mostrar notificaciones toast
    function showToast(icon, title, text, timer = 3000) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: icon,
            title: title,
            text: text
        });
    }

    async function callGeminiAPI(prompt, outputId, loaderId) {
        const outputEl = document.getElementById(outputId);
        const loaderEl = document.getElementById(loaderId);

        if (!outputEl || !loaderEl) {
            showToast('error', 'Error', 'Elemento no encontrado');
            return;
        }

        loaderEl.classList.add('active');
        outputEl.textContent = '';

        const payload = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };

        try {
            // Llamada a función serverless para ocultar la API key
            const res = await fetch('/.netlify/functions/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }

            const json = await res.json();
            const text = json.text;

            if (!text) {
                showToast('warning', 'Atención', 'La IA no generó una respuesta válida');
                outputEl.textContent = 'No se pudo generar una respuesta en este momento.';
                return;
            }

            // Renderizar texto con formato Markdown a HTML
            outputEl.innerHTML = DOMPurify.sanitize(marked.parse(text));
            showToast('success', '¡Listo!', 'Respuesta generada con éxito');

        } catch (err) {
            console.error('Error en la llamada a la API:', err);
            const errorMessage = err.message || 'Error al conectar con el servicio de IA';
            showToast('error', 'Error', errorMessage);
            outputEl.textContent = `Error: ${errorMessage}`;
        } finally {
            loaderEl.classList.remove('active');
        }
    }

    // Optimizar descripción de servicio
    const optimizeBtn = document.getElementById('optimizeDescriptionBtn');
    const clearDescBtn = document.getElementById('clearServiceDescriptionBtn');
    if (optimizeBtn && clearDescBtn) {
        optimizeBtn.addEventListener('click', () => {
            const desc = document.getElementById('serviceDescriptionInput').value.trim();
            if (!desc) {
                showToast('warning', 'Campo requerido', 'Por favor, ingrese una descripción');
                return;
            }
            const prompt = `Eres experto en marketing. Mejora: "${desc}" ofreciendo 3 sugerencias enfocadas en claridad e impacto.`;
            callGeminiAPI(prompt, 'serviceDescriptionOutput', 'serviceDescriptionLoader');
        });
        clearDescBtn.addEventListener('click', () => {
            document.getElementById('serviceDescriptionInput').value = '';
            document.getElementById('serviceDescriptionOutput').textContent = '';
        });
    }

    // Generador de ideas de marketing
    const genIdeasBtn = document.getElementById('generateMarketingIdeasBtn');
    const clearIdeasBtn = document.getElementById('clearMarketingIdeasBtn');
    if (genIdeasBtn && clearIdeasBtn) {
        genIdeasBtn.addEventListener('click', () => {
            const prompt = `Genera 3 ideas innovadoras de marketing digital para ORJATECH basado en sus servicios...`;
            callGeminiAPI(prompt, 'marketingIdeasOutput', 'marketingIdeasLoader');
        });
        clearIdeasBtn.addEventListener('click', () => {
            document.getElementById('marketingIdeasOutput').textContent = '';
        });
    }

    // Analizador de riesgos IA
    const analyzeBtn = document.getElementById('analyzeRisksBtn');
    const clearRiskBtn = document.getElementById('clearRiskAnalysisBtn');
    if (analyzeBtn && clearRiskBtn) {
        analyzeBtn.addEventListener('click', () => {
            const existing = risksData.map(r => `- ${r.risk} (Mitigación: ${r.mitigation})`).join('\n');
            const prompt = `Analiza estos riesgos:\n${existing}\nSugiere 2 mitigaciones adicionales y 1 riesgo nuevo.`;
            callGeminiAPI(prompt, 'riskAnalysisOutput', 'riskAnalysisLoader');
        });
        clearRiskBtn.addEventListener('click', () => {
            document.getElementById('riskAnalysisOutput').textContent = '';
        });
    }

});
