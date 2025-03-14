const API_KEY = 'AIzaSyB3Lu22nUV_G9llHGkHN1e7Hm2Mocny-FE';  // Reemplázalo con tu clave
const CHANNEL_ID = 'UCx-JNGoyRJrCjoeW3gESKcQ'; // Reemplázalo con el ID de tu canal

async function fetchVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`);
        const data = await response.json();

        if (!data.items) throw new Error('No se encontraron videos');

        const videoContainer = document.querySelector('.video-container');
        videoContainer.innerHTML = ''; // Limpiar contenedor

        data.items.forEach(video => {
            const videoId = video.id.videoId;
            const title = video.snippet.title;
            const thumbnail = video.snippet.thumbnails.medium.url;

            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');
            videoCard.setAttribute('data-video', `https://www.youtube.com/watch?v=${videoId}`);

            videoCard.innerHTML = `
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
            `;

            videoCard.addEventListener('click', function () {
                window.open(this.getAttribute('data-video'), '_blank', 'noopener,noreferrer');
            });

            videoContainer.appendChild(videoCard);
        });
    } catch (error) {
        console.error('Error al obtener los videos:', error);
    }
}

// Llamar a la función al cargar la página
fetchVideos();

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