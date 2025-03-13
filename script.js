// Enlaces de redes sociales - Reemplaza con tus propios enlaces
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const network = this.getAttribute('title');
        let url = '#';
        
        switch(network) {
            case 'Facebook':
                url = 'https://facebook.com/tucanal';
                break;
            case 'Twitter':
                url = 'https://twitter.com/tucanal';
                break;
            case 'Instagram':
                url = 'https://instagram.com/tucanal';
                break;
            case 'TikTok':
                url = 'https://tiktok.com/@tucanal';
                break;
        }
        
        window.open(url, '_blank');
    });
});

// Botón para ir al canal de YouTube
document.querySelector('.channel-btn').addEventListener('click', function() {
    window.open('https://www.youtube.com/@tutorialescamacho8367');
});

// Hacer que los videos sean clickeables
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', function() {
        // Aquí puedes agregar la lógica para abrir el video específico
        // Por ejemplo: window.open('https://youtube.com/watch?v=ID_DEL_VIDEO', '_blank');
        alert('Abriendo video...');
    });
});