const musicContainer = document.querySelector('.player-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currTime = document.getElementById('curr-time');
const durTime = document.getElementById('dur-time');
const volumeSlider = document.getElementById('volume');
const playlistItems = document.getElementById('playlist-items');

// Song Data
const songs = [
    {
        name: 'test Audio 1',
        artist: 'Unknown',
        file: 'WhatsApp Audio 2024-12-11 at 20.20.30_ba52a6db.mp3',
        cover: 'images/cover1.png'
    },
    {
        name: 'test Audio 2',
        artist: 'Unknown',
        file: 'WhatsApp Audio 2025-03-30 at 16.35.30_b5cc6aa0.mp3',
        cover: 'images/cover2.png'
    }
];

// State
let songIndex = 0;
let isShuffle = false;
let isRepeat = false;

// Init
loadSong(songs[songIndex]);
renderPlaylist();

// Functions

function loadSong(song) {
    title.innerText = song.name;
    artist.innerText = song.artist;
    // Check if file already has extension, if not add .mp3 (backward compatibility)
    if (song.file.endsWith('.mp3')) {
        audio.src = `songs/${song.file}`;
    } else {
        audio.src = `songs/${song.file}.mp3`;
    }
    cover.src = song.cover;

    // Highlight in playlist
    updatePlaylistActive();
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    cover.classList.add('rotate');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    cover.classList.remove('rotate');
    audio.pause();
}

function prevSong() {
    if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent || 0;

    // Update time display
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currTime.innerText = `${currentMinutes}:${currentSeconds}`;

    if (duration) {
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        durTime.innerText = `${durationMinutes}:${durationSeconds}`;
    }
}

function setProgress(e) {
    const width = this.value;
    const duration = audio.duration;
    audio.currentTime = (width / 100) * duration;
}

function setVolume() {
    audio.volume = volumeSlider.value;
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active');
}

function renderPlaylist() {
    playlistItems.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${song.name}</span> <span>${song.artist}</span>`;
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
        playlistItems.appendChild(li);
    });
    updatePlaylistActive();
}

function updatePlaylistActive() {
    const items = playlistItems.querySelectorAll('li');
    items.forEach((item, index) => {
        if (index === songIndex) {
            item.classList.add('active-song');
        } else {
            item.classList.remove('active-song');
        }
    });
}

// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    if (isRepeat) {
        playSong();
    } else {
        nextSong();
    }
});

progress.addEventListener('input', setProgress);
volumeSlider.addEventListener('input', setVolume);

shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
