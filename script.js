const player = document.getElementById('player');

  // Playlist with all 14 songs
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
      // Autoplay blocked, retry silently
      setTimeout(loadAndPlayTrack, 1000);
    });
  }

  // Move to next track (endless loop)
  function nextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= shuffledPlaylist.length) {
      shuffledPlaylist = shuffle([...playlist]); // Reshuffle
      currentTrackIndex = 0;
    }
    loadAndPlayTrack();
  }

  // Event listeners
  player.onended = nextTrack;

  // Start muted to comply with autoplay policies
  player.muted = true;
  loadAndPlayTrack();