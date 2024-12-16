const state = {
  view: {
    square: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },

  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    livesLeft: 10,
    gameActive: true,
  },

  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function randomSquare() {
  state.view.square.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.square[randomNumber];

  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.square.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (!state.values.gameActive) return;

      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        state.values.livesLeft--;
        state.view.lives.textContent = state.values.livesLeft;
        state.values.hitPosition = null;
      }

      if (state.values.livesLeft <= 0) {
        state.values.gameActive = false;
      }
    });
  });
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime === 0 || state.values.livesLeft === 0) {
    state.values.gameActive = false;
    alert(`GAME OVER! A sua pontuação foi: ${state.values.result}`);
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.1;
  audio.play();
}

function init() {
  addListenerHitBox();
}

init();
