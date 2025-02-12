document.addEventListener("DOMContentLoaded", () => {
  const players = document.querySelectorAll(".player");
  let currentlyPlaying = null;

  players.forEach((playerContainer, index) => {
    const player = playerContainer.querySelector("audio");
    const playerbtn = playerContainer;
    const progress = playerContainer.querySelector(".progress");
    const current = playerContainer.querySelector(".current");

    const playpause = function () {
      if (currentlyPlaying && currentlyPlaying !== player) {
        currentlyPlaying.pause();
      }

      if (player.paused) {
        player.play();
        currentlyPlaying = player;
      } else {
        player.pause();
        currentlyPlaying = null;
      }
    }

    playerbtn.addEventListener("click", playpause);

    player.ontimeupdate = function () {
      let ct = player.currentTime;
      current.innerHTML = timeFormat(ct);
      //progress
      let duration = player.duration;
      let prog = Math.floor((ct * 100) / duration);
      progress.style.setProperty("--progress", prog + "%");
    }
  });

  function timeFormat(ct) {
    let minutes = Math.floor(ct / 60);
    let seconds = Math.floor(ct % 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }
});