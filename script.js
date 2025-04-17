const API_KEY = 'AIzaSyB3Lu22nUV_G9llHGkHN1e7Hm2Mocny-FE';
const CHANNEL_USERNAME = '@tutorialescamacho8367';

async function getChannelIdFromUsername(username) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${username}&type=channel&part=snippet`);
    const data = await response.json();
    return data.items?.[0]?.snippet?.channelId || null;
}

async function fetchVideos() {
    try {
        const channelId = await getChannelIdFromUsername(CHANNEL_USERNAME);
        if (!channelId) throw new Error('No se pudo obtener el ID del canal.');

        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=6`);
        const data = await response.json();

        if (!data.items) throw new Error('No se encontraron videos');

        const grid = document.querySelector('.videos-grid');
        grid.innerHTML = ''; // Limpiar tarjetas actuales

        data.items.forEach(video => {
            if (!video.id.videoId) return;

            const videoId = video.id.videoId;
            const title = video.snippet.title;
            const thumbnail = video.snippet.thumbnails.medium.url;
            const date = new Date(video.snippet.publishedAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');
            videoCard.innerHTML = `
                <div class="thumbnail-container">
                    <img src="${thumbnail}" alt="Miniatura del video">
                    <div class="play-icon">
                        <i class="fas fa-play-circle"></i>
                    </div>
                </div>
                <div class="video-info">
                    <h3>${title}</h3>
                    <p>${video.snippet.description.slice(0, 80)}...</p>
                    <div class="video-stats">
                        <span><i class="far fa-calendar-alt"></i> ${date}</span>
                        <span><i class="far fa-eye"></i> + vistas</span>
                    </div>
                </div>
            `;

            videoCard.addEventListener('click', () => {
                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
            });

            grid.appendChild(videoCard);
        });
    } catch (error) {
        console.error('Error al obtener los videos:', error);
    }
}

// Al cargar la página
fetchVideos();

// Enlaces de redes sociales
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const network = this.getAttribute('title');
        let url = '#';

        switch (network) {
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

// Botón para ir al canal
document.querySelector('.channel-btn').addEventListener('click', function () {
    window.open('https://www.youtube.com/@tutorialescamacho8367');
});
