document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#animated-logo');
    const logo = document.querySelector('.logo');
    const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#a6c1ee'];
    const particleCount = 30; // Cantidad de partículas alrededor del logo

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'logo-particle';
        
        // Tamaño aleatorio (2px a 6px)
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Color aleatorio
        const color1 = colors[Math.floor(Math.random() * colors.length)];
        const color2 = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `linear-gradient(145deg, ${color1}, ${color2})`;
        
        // Posición inicial aleatoria (dentro del contenedor)
        const posX = Math.random() * container.offsetWidth;
        const posY = Math.random() * container.offsetHeight;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        
        // Animación flotante única por partícula
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
        
        // Animación de movimiento orbital
        animateParticle(particle, posX, posY);
    }

    function animateParticle(particle, initialX, initialY) {
        let angle = Math.random() * Math.PI * 2; // Ángulo inicial aleatorio
        const radius = Math.random() * 60 + 40; // Radio orbital
        const speed = Math.random() * 0.02 + 0.01; // Velocidad
        
        function move() {
            // Movimiento orbital base
            angle += speed;
            const orbitX = initialX + Math.cos(angle) * radius;
            const orbitY = initialY + Math.sin(angle) * radius;
            
            // Añadir fluctuación aleatoria para efecto orgánico
            const fluctuationX = Math.sin(angle * 3) * 15;
            const fluctuationY = Math.cos(angle * 2.5) * 15;
            
            particle.style.transform = `translate(${fluctuationX}px, ${fluctuationY}px)`;
            particle.style.left = `${orbitX}px`;
            particle.style.top = `${orbitY}px`;
            
            requestAnimationFrame(move);
        }
        
        move();
    }

    // Interacción con el mouse (las partículas huyen del cursor)
    container.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.logo-particle');
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        particles.forEach(particle => {
            const particleX = parseFloat(particle.style.left) + parseFloat(particle.style.width) / 2;
            const particleY = parseFloat(particle.style.top) + parseFloat(particle.style.height) / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - particleX, 2) + 
                Math.pow(mouseY - particleY, 2)
            );
            
            if (distance < 80) { // Radio de influencia del mouse
                const force = (80 - distance) / 80 * 3;
                const angle = Math.atan2(particleY - mouseY, particleX - mouseX);
                
                particle.style.left = `${particleX + Math.cos(angle) * force}px`;
                particle.style.top = `${particleY + Math.sin(angle) * force}px`;
            }
        });
    });
});