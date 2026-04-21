document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================================
       Intersection Observer para animaciones en Scroll
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejamos de observar una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    /* ==========================================================================
       Fondo de Partículas / Estrellas interactivo
       ========================================================================== */
    initParticles();

    /* ==========================================================================
       Gestión de enfoque para certificados en dispositivos táctiles
       ========================================================================== */
    const certificates = document.querySelectorAll('.cert-frame');
    certificates.forEach(cert => {
        cert.addEventListener('click', function() {
            // Elimina focus de otros para que el tooltip actual sea el único visible en mobile
            certificates.forEach(c => {
                if (c !== this) c.blur();
            });
        });
    });
});

/**
 * Función para generar un fondo animado simple con Vanilla JS
 */
function initParticles() {
    const container = document.getElementById('particles-bg');
    if (!container) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const maxParticles = window.innerWidth < 768 ? 40 : 100;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
            // Tonos azules y morados
            const colors = ['168, 85, 247', '96, 165, 250', '255, 255, 255'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > width) this.x = 0;
            else if (this.x < 0) this.x = width;
            
            if (this.y > height) this.y = 0;
            else if (this.y < 0) this.y = height;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    });

    createParticles();
    animate();
}
