const soundEffects = {
  play: (path) => {
    const audio = new Audio(`./soundEffects/voices/${path}`);
    // const audio = new Audio('./soundEffects/voices/jasmin/i see u.m4a');
    audio.volume = settings.hasMutedSound ? 0 : 1;
    audio.play();
  },
  playExplosionSound: () => {
    const audio = new Audio('./soundEffects/purchased/Mine Explosion 1.wav');
    audio.volume = settings.hasMutedSound ? 0 : 0.2;
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
  playScoreSound: () => {
    const audio = new Audio('./soundEffects/purchased/Button Menu Application SFX 57.mp3');
    audio.volume = settings.hasMutedSound ? 0 : 0.03;
    audio.play();
  },
  playWrongSound: () => {
    const audio = new Audio('./soundEffects/purchased/Wrong.wav');
    audio.volume = settings.hasMutedSound ? 0 : 0.2;
    audio.play();
  },
  runSpeaker: (audio) => {
    const speaker = () => {
      task.addClassByQuerySelector(".title img", "big");
      setTimeout(() => {
        task.removeClassByQuerySelector(".title img", "big");
      }, 200)
    }
    const timeOuts = [ 0, 434, 869, 1303, 1737, 1986, 2256 ];
    let count = 1;
    const run = () => {
      count++;
      if(count <= 17 && !on_game_board){
        timeOuts.forEach(time => {
          setTimeout(() => {speaker()}, time);
        })
        setTimeout(() => { run() }, 4340);
      }
    }
    run();
  },
  playBoardMusic: () => {
    const audio = new Audio('./soundEffects/Song_Beat/Zazah beat 22.mp3');
    audio.volume = settings.hasMutedMusic ? 0 : 0.08;
    $(document).on("click", ".boardBackButton", () => {
      audio.currentTime = 0;
      audio.pause();
    });
    audio.play().then(() => {
      // playing music
      soundEffects.replayWhenDone(audio);
    }).catch(e => console.log(e));
  },
  replayWhenDone: (audio) => {
    audio.addEventListener('ended', function() {
        setTimeout(() => {
          this.currentTime = 0;
          this.play();
        }, 1000);
    }, false);
  },
  playMusicClicked: false,
  playGameMusic: () => {
    const clickFunction = playSong => {
      if(soundEffects.playMusicClicked) return null;

      let playVolume = 0.4;
      const audio = new Audio('./soundEffects/Song_Beat/ZazahBeatSlow.mp3');
      soundEffects.runSpeaker(audio);
      audio.volume = settings.hasMutedMusic ? 0 : playVolume;
      audio.play().then(() => {
        soundEffects.replayWhenDone(audio);
        // Video playback started ;)
        document.getElementById("gameScreen").removeEventListener("click",  clickFunction);
        $(document).on("click", ".mOptions.off", () => {
          audio.pause();
        });
        $(document).on("click", ".mOptions.on", () => {
          if(!settings.hasMutedMusic) audio.play();
        });
        // adjust volume on game play
        $(document).on("click", ".tipsText", () => {
          audio.pause();
          soundEffects.playBoardMusic();
        });
        $(document).on("click", ".tipsImages", () => {
          audio.pause();
          soundEffects.playBoardMusic();
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
    }
    document.getElementById("gameScreen").addEventListener("click",  clickFunction);
  }
}
