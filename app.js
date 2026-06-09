// ==========================================================================
// JavaScript Dinámico Avanzado - Web Personal de Ulises Altamirano
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initSmoothScroll();
    initIntersectionObserver();
});

/**
 * 1. CAMBIO DE ESTILO DEL HEADER AL HACER SCROLL
 * Inyecta una sola clase global delegando la presentación visual al CSS.
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let ticking = false;

    const checkScroll = () => {
        // Añade o quita la clase dependiendo de la posición del scroll
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        // requestAnimationFrame sincroniza la ejecución con los hercios de la pantalla
        if (!ticking) {
            window.requestAnimationFrame(checkScroll);
            ticking = true;
        }
    }, { passive: true }); // 'passive' optimiza drásticamente el rendimiento en móviles
}

/**
 * 2. DESPLAZAMIENTO INTELIGENTE Y SUAVE PARA EL MENÚ
 * Evita que el header fijo tape el título o inicio de cada sección al hacer clic.
 */
function initSmoothScroll() {
    const header = document.querySelector('header');
    const links = document.querySelectorAll('.nav-links a:not(.btn-contacto)');
    
    if (!links.length) return;

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Verificamos que sea un enlace interno válido
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculamos la altura real del header en el momento exacto del click
                    const headerHeight = header ? header.offsetHeight : 0;
                    const sectionPosition = targetSection.offsetTop;
                    
                    window.scrollTo({
                        top: sectionPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * 3. EFECTO REVEAL (Aparición fluida de tarjetas al bajar)
 * Uso de Intersection Observer para una animación nativa y eficiente.
 */
function initIntersectionObserver() {
    // Captura tanto las tarjetas de servicios como las de proyectos (portafolio)
    const elementosAnimar = document.querySelectorAll('.service-card, .portfolio-card');
    if (!elementosAnimar.length) return;

    // Preparamos los elementos agregando la clase que los oculta y los baja en el espacio
    elementosAnimar.forEach(el => el.classList.add('reveal-ready'));

    const opciones = {
        root: null, // Usa el viewport del navegador
        threshold: 0.12, // Se activa cuando el 12% de la tarjeta es visible
        rootMargin: "0px 0px -10px 0px" // Margen inferior para un disparo más natural
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Inyectamos la clase que ejecuta la transición física de CSS
                entry.target.classList.add('reveal-visible');
                // Dejamos de vigilar este elemento específico para liberar memoria RAM
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, opciones);
    
    // Ponemos en observación cada tarjeta detectada
    elementosAnimar.forEach(el => observer.observe(el));
}
