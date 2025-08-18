const player = document.getElementById('player');
    const muteButton = document.getElementById('muteButton');

    // Playlist of your four songs (update filenames if different)
    const playlist = [
      'audio/duvet.mp3',
      'audio/friday.mp3',
      'audio/japan.mp3',
      'audio/nitrous.mp3'
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

    // Move to next track
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