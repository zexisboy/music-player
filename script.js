const player = document.getElementById('player');
const muteButton = document.getElementById('muteButton');

// Playlist with full GitHub URLs for rerouting audio
const playlist = [
  'https://zexisboy.github.io/music-player/audio/duvet.mp3',
  'https://zexisboy.github.io/music-player/audio/friday.mp3',
  'https://zexisboy.github.io/music-player/audio/japan.mp3',
  'https://zexisboy.github.io/music-player/audio/nitrous.mp3'
];

// Shuffle function (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize playlist with shuffle
let currentTrackIndex = 0;
let shuffledPlaylist = shuffle([...playlist]);

// Load and play track
function loadAndPlayTrack() {
  player.src = shuffledPlaylist[currentTrackIndex];
  player.play().catch(() => {
    // Handle autoplay block by changing button to require click
    muteButton.textContent = 'Start Music';
    muteButton.onclick = () => {
      player.play();
      player.muted = false;
      muteButton.textContent = 'Mute';
      muteButton.onclick = toggleMute;
    };
  });
}

// Endless loop: Move to next track, reshuffle if end reached
function nextTrack() {
  currentTrackIndex++;
  if (currentTrackIndex >= shuffledPlaylist.length) {
    shuffledPlaylist = shuffle([...playlist]); // Reshuffle for endless variety
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

// Start muted to avoid autoplay issues
player.muted = true;
loadAndPlayTrack();