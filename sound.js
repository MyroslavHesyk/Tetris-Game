document.addEventListener("DOMContentLoaded", function () {
    const soundButton = document.getElementById("soundButton");
    let isSoundOn = false;
    let audio = new Audio("./assets/audio/tetris.mp3"); // Замініть "sound.mp3" на шлях до вашого аудіофайлу
  
    soundButton.addEventListener("click", function () {
      isSoundOn = !isSoundOn;
      updateSoundButton();
      toggleSound();
    });
  
    function updateSoundButton() {
      soundButton.innerHTML = isSoundOn ? '<i class="fas fa-volume-up"></i> ' : '<i class="fas fa-volume-mute"></i> ';

      soundButton.classList.toggle("sound-on", isSoundOn);
      soundButton.classList.toggle("sound-off", !isSoundOn);
    }
  
    function toggleSound() {
      if (isSoundOn) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0; // Скидаємо час аудіо на початок, щоб відтворити з початку при наступному ввімкненні
      }
    }

  });
  