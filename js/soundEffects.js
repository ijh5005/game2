const soundEffects = {
  playExplosionSound: () => {
    const audio = new Audio('./soundEffects/explosion.mp3');
    audio.volume = hasMuted ? 0 : 0.1;
    audio.play();
  },
  playShowBombSound: () => {
    const audio = new Audio('./soundEffects/showBomb.mp3');
    audio.volume = hasMuted ? 0 : 0.2;
    audio.play();
  },
  playLineClickSound: () => {
    const audio = new Audio('./soundEffects/lineClick.mp3');
    audio.volume = hasMuted ? 0 : 0.1;
    audio.play();
  }
}
