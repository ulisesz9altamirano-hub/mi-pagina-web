// ==========================================================================
// JavaScript dinámico para la Web Personal de Ulises Altamirano
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CAMBIO DE ESTILO DEL HEADER AL HACER SCROLL
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Cuando baja más de 50px, el header se vuelve más compacto y oscuro
            header.style.padding = '10px 50px';
            header.style.backgroundColor = 'rgba(10, 10, 26, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            // Vuelve al estado inicial premium cuando está arriba de todo
            header.style.padding = '15px 50px';
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.8)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
        }
    });

    // 2. CORRECCIÓN DE DESPLAZAMIENTO (SCROLL) PARA EL MENÚ
    // Evita que la barra fija (navbar) tape el inicio de cada sección
    const links = document.querySelectorAll('.nav-links a:not(.btn-contacto)');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Solo si el enlace apunta a un ID interno
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const sectionPosition = targetSection.offsetTop;
                    
                    // Desplazamiento inteligente restando la altura del header
                    window.scrollTo({
                        top: sectionPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. EFECTO REVEAL (APARICIÓN DE TARJETAS AL BAJAR)
    // Usamos Intersection Observer, la forma más moderna y eficiente
    const elementosAnimar = document.querySelectorAll('.service-card, .portfolio-card');
    
    // Configuramos los estilos iniciales invisibles desde JS para que si el usuario
    // no tiene JS activado, la página se vea igual.
    elementosAnimar.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const opciones = {
        root: null, // Usa el viewport del navegador
        threshold: 0.15, // Se activa cuando se ve el 15% del elemento
        rootMargin: "0px"
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elemento = entry.target;
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
                // Una vez que aparece, dejamos de vigilarlo para mejorar rendimiento
                observer.unobserve(elemento);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, opciones);
    
    elementosAnimar.forEach(elemento => {
        observer.observe(elemento);
    });
});
