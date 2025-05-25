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
        // ... demás riesgos ...
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
            // Cerrar todas
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = '0px');
            document.querySelectorAll('.accordion-header .arrow').forEach(a => a.style.transform = 'rotate(0deg)');
            // Abrir la actual
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
            data: {
                labels: ['Activos Fijos', 'Intangibles', 'Capital de Trabajo'],
                datasets: [{
                    data: [25e6, 15e6, 45e6],
                    backgroundColor: ['#00C9D1', '#A020F0', '#0A2A4D'],
                    borderColor: getComputedStyle(document.documentElement)
                        .getPropertyValue('--futuristic-card-bg').trim(),
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { family: 'Inter', size: 10 }, color: chartFontColor }
                    },
                    tooltip: {
                        bodyFont: { family: 'Inter' },
                        titleFont: { family: 'Inter' },
                        callbacks: {
                            label: ctx => {
                                const val = ctx.parsed;
                                return `${ctx.label}: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val)}`;
                            }
                        }
                    }
                }
            }
        });
    }

    // ... Repite para `mercadoChart` y `ingresosChart` con configuraciones similares ...

    // Año en el footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Inicializar sección según hash
    setActiveSection(window.location.hash);
});
