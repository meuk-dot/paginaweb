document.addEventListener('DOMContentLoaded', () => {
    
    // 1. EFECTO DE RESPLANDOR SEGUIDOR DE RATÓN (MOUSE TRACKING RADIAL GLOW)
    // Añade un brillo de alta tecnología que sigue el puntero del usuario en las tarjetas.
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posición X dentro del contenedor
            const y = e.clientY - rect.top;  // Posición Y dentro del contenedor
            
            // Inyectamos dinámicamente un gradiente radial usando variables CSS en tiempo real
            card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 40%), var(--card)`;
        });
        
        // Restablecer el fondo cuando el ratón salga de la tarjeta
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--card)';
        });
    });

    // 2. FILTRADO DINÁMICO DE DIVISIONES (GAMES FILTER)
    // Permite alternar sin recargar la página entre juegos de PC y Mobile con transiciones fluidas.
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('#games-grid .card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase activa de botones anteriores y asignar al actual
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            gameCards.forEach(card => {
                const platform = card.getAttribute('data-platform');

                if (filterValue === 'all' || platform === filterValue) {
                    card.style.display = 'block';
                    // Pequeño timeout para permitir que el navegador registre el cambio de display antes de la opacidad
                    setTimeout(() => {
                        card.classList.remove('fade-out');
                    }, 10);
                } else {
                    card.classList.add('fade-out');
                    // Esperamos a que termine la animación de desvanecimiento para ocultar el elemento por completo
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400); 
                }
            });
        });
    });

    // 3. ANIMACIÓN DE ENTRADA INTELIGENTE AL HACER SCROLL (INTERSECTION OBSERVER)
    // Sustituye las animaciones CSS por defecto basadas en timelines experimentales,
    // garantizando soporte cross-browser impecable para la aparición gradual de secciones.
    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // Aplicamos la animación directamente al entrar en el viewport
                entry.target.style.animation = 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                observer.unobserve(entry.target); // Dejamos de observar una vez animado
            }
        });
    }, observerOptions);

    // Seleccionamos los títulos y contenedores de tarjetas para el efecto reveal
    document.querySelectorAll('.section-title, .cards, .cta').forEach(el => {
        el.style.opacity = '0'; // Estado inicial oculto
        sectionObserver.observe(el);
    });
});