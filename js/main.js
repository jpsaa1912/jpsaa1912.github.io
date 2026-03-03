// main.js - Funcionalidad compartida para todas las páginas

document.addEventListener('DOMContentLoaded', function() {
    // Generar estrellas de fondo
    createStars();
    
    // Inicializar menú móvil
    initMobileMenu();
    
    // Resaltar enlace activo en la navegación
    highlightActiveNav();
});

/**
 * Crea el efecto de estrellas en el fondo
 */
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Tamaño aleatorio
        const size = Math.random() * 4 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Posición aleatoria
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Animación aleatoria
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        // Opacidad aleatoria
        star.style.opacity = Math.random() * 0.8 + 0.2;
        
        starsContainer.appendChild(star);
    }
}

/**
 * Inicializa el menú hamburguesa para móviles
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Cambiar icono
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

/**
 * Resalta el enlace activo en la navegación basado en la URL actual
 */
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'privacy.html' && linkHref === 'privacy.html') ||
            (currentPage === 'terms.html' && linkHref === 'terms.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Efecto de escritura para el título en la página principal
if (document.querySelector('h1') && window.location.pathname.includes('index')) {
    const titleElement = document.querySelector('h1');
    const originalText = titleElement.textContent;
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            titleElement.innerHTML = originalText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Iniciar efecto después de cargar la página
    setTimeout(typeWriter, 500);
}

// Efecto de aparición secuencial para elementos
const elementsToAnimate = document.querySelectorAll('.subtitle, .main-text, .coming-soon, .btn, .social-section, footer');
elementsToAnimate.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px';
    
    setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, 300 + (index * 200));
});