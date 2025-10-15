// Smooth scrolling per i link di navigazione
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animazione navbar al scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Animazione elementi al scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Osserva tutti gli elementi con animazione
document.querySelectorAll('.feature-card, .download-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Effetto particelle nel background (opzionale)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = 'rgba(99, 102, 241, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    particle.style.zIndex = '0';
    
    document.body.appendChild(particle);
    
    let position = -10;
    const speed = Math.random() * 2 + 1;
    
    const fall = setInterval(() => {
        position += speed;
        particle.style.top = position + 'px';
        
        if (position > window.innerHeight) {
            clearInterval(fall);
            particle.remove();
        }
    }, 20);
}

// Genera particelle ogni tanto
setInterval(createParticle, 300);

// Gestione click sui pulsanti download (puoi personalizzare)
document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Download in corso... Questa è una demo. Collega qui il tuo link di download reale!');
    });
});

// Effetto hover sul mockup desktop
const desktopPreview = document.querySelector('.desktop-preview');
if (desktopPreview) {
    desktopPreview.addEventListener('mousemove', (e) => {
        const rect = desktopPreview.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const moveX = (x / rect.width - 0.5) * 20;
        const moveY = (y / rect.height - 0.5) * 20;
        
        desktopPreview.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    desktopPreview.addEventListener('mouseleave', () => {
        desktopPreview.style.transform = 'translate(0, 0)';
    });
}

// Counter animato per le statistiche
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Osserva le statistiche e anima quando diventano visibili
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                statNumber.textContent = '0';
                animateCounter(statNumber, number);
            }
            
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

console.log('🚀 RadiumOS Landing Page caricata con successo!');
