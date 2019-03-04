const soundEffects = {
  playExplosionSound: () => {
    const audio = new Audio('./soundEffects/purchased/Mine Explosion 1.wav');
    audio.volume = settings.hasMutedSound ? 0 : 0.1;
    audio.play();
  },
  playShowBombSound: () => {
    const audio = new Audio('./soundEffects/showBomb.mp3');
    audio.volume = settings.hasMutedSound ? 0 : 0.2;
    audio.play();
  },
  playLineClickSound: () => {
    const audio = new Audio('./soundEffects/purchased/Balloon_Pop-by_YIO.wav');
    audio.volume = settings.hasMutedSound ? 0 : 0.1;
    audio.play();
  },
  playEraseBombSound: () => {
    const audio = new Audio('./soundEffects/eraseBomb.mp3');
    audio.volume = settings.hasMutedSound ? 0 : 0.4;
    audio.play();
  },
  playGameMusic: () => {
    $("#gameScreen").click(playSong = () => {
      let playVolume = 0.4;
      const audio = new Audio('./soundEffects/Song_Beat/ZazahBeatSlow.mp3');
      audio.volume = settings.hasMutedMusic ? 0 : playVolume;
      audio.addEventListener('ended', function() {
          setTimeout(() => {
            this.currentTime = 0;
            this.play();
          }, 1000);
      }, false);
      audio.play().then(() => {
        // Video playback started ;)
        console.log("playing song...");
        $("#gameScreen").unbind();
        $(document).on("click", ".mOptions.off", () => {
          audio.pause();
        });
        $(document).on("click", ".mOptions.on", () => {
          if(!settings.hasMutedMusic) audio.play();
        });
        // adjust volume on game play
        $(document).on("click", ".playBoardButton", () => {
          audio.pause();
        });
        $(document).on("click", ".boardBackButton", () => {
          audio.currentTime = 0;
          if(!settings.hasMutedMusic) audio.play();
        });
      })
      .catch(e => {
        // Video playback failed ;(
        console.log(e);
      });
    });
  }
}
