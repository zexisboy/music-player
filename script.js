const player = document.getElementById('player');
const muteButton = document.getElementById('muteButton');

// Playlist with all 14 songs using GitHub Pages URLs
const playlist = [
  'https://zexisboy.github.io/music-player/audio/duvet.mp3',
  'https://zexisboy.github.io/music-player/audio/eyes.mp3',
  'https://zexisboy.github.io/music-player/audio/feelit.mp3',
  'https://zexisboy.github.io/music-player/audio/flash.mp3',
  'https://zexisboy.github.io/music-player/audio/friday.mp3',
  'https://zexisboy.github.io/music-player/audio/ghost.mp3',
  'https://zexisboy.github.io/music-player/audio/god.mp3',
  'https://zexisboy.github.io/music-player/audio/hero.mp3',
  'https://zexisboy.github.io/music-player/audio/hq.mp3',
  'https://zexisboy.github.io/music-player/audio/japan.mp3',
  'https://zexisboy.github.io/music-player/audio/nitrous.mp3',
  'https://zexisboy.github.io/music-player/audio/pablo.mp3',
  'https://zexisboy.github.io/music-player/audio/stars.mp3',
  'https://zexisboy.github.io/music-player/audio/wonder.mp3'
];

// Shuffle function (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize playlist
let currentTrackIndex = 0;
let shuffledPlaylist = shuffle([...playlist]);

// Load and play track
function loadAndPlayTrack() {
  player.src = shuffledPlaylist[currentTrackIndex];
  player.play().catch(() => {
    // Autoplay blocked, wait for user interaction
    muteButton.textContent = 'Start Music';
    muteButton.onclick = () => {
      player.play();
      player.muted = false;
      muteButton.textContent = 'Mute';
      muteButton.onclick = toggleMute;
    };
  });
}

// Move to next track (endless loop)
function nextTrack() {
  currentTrackIndex++;
  if (currentTrackIndex >= shuffledPlaylist.length) {
    shuffledPlaylist = shuffle([...playlist]); // Reshuffle when done
    currentTrackIndex = 0;
  }
  loadAndPlayTrack();
}

// Toggle mute/unmute
function toggleMute() {
  player.muted = !player.muted;
  muteButton.textContent = player.muted ? 'Unmute' : 'Mute';
}

// Event listeners
player.onended = nextTrack;
muteButton.onclick = toggleMute;

// Start muted to comply with autoplay policies
player.muted = true;
loadAndPlayTrack();