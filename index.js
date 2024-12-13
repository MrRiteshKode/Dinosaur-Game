console.log("working..");

// all variables
let head = document.querySelector("#head");
let scoreId = document.getElementById("scoreId");
let dragon = document.querySelector(".dragon");
let obstacle = document.querySelector(".obstacle")
let position = 54;
let score = 0;
let obstaclePassed = true;
let audiogo = new Audio('partials/gameover.mp3');

// score update func
function scoreUpdate(score) {
  scoreId.textContent = score
}

// logic fo game over & score increment
setInterval(() => {
  rect1 = dragon.getBoundingClientRect();
  rect2 = obstacle.getBoundingClientRect();
  // console.log(rect1.x, rect1.y, rect2.x, rect2.y, rect1.width)

  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    audiogo.play();
    score = 0
    scoreUpdate(score)
    obstacle.style.animationPlayState = "paused";
    audiogo.play();
    head.textContent = "Game Over - Refresh To Play";
    setTimeout(() => {
      audiogo.pause();
    }, 1000);

  }
  else if (rect1.right > rect2.left && obstaclePassed) {
    score += 10
    scoreUpdate(score)
    obstaclePassed = false;
    setTimeout(() => {
      obstaclePassed = true;
    }, 1000);

  }
}, 500);

// for Boundary detection 
function gameOverCheck() { 
  const rect = dragon.getBoundingClientRect();
  if (window.innerWidth - rect.left > window.innerWidth || window.innerWidth - rect.left == 230) {
    audiogo.play();
    obstacle.style.animationPlayState = "paused";
    audiogo.play();
    head.textContent = "Game Over - Refresh To Play";
    setTimeout(() => {
      audiogo.pause();
    }, 1000);
  }
}

// Function to trigger the jump animation
function jump() {
  if (!dragon.classList.contains("animateDino")) { // Prevent double jump
    dragon.classList.add("animateDino");

    // Remove the class after the animation ends
    setTimeout(() => {
      dragon.classList.remove("animateDino");
    }, 700); // Match this to the duration of the animation (500ms)
  }
}

// moves right
function right() {
  position += 10;
  dragon.style.left = position + 'px';
  gameOverCheck()
}

// moves left
function left() {
  position += -10;
  dragon.style.left = position + 'px';
  gameOverCheck()
}

// Event listener for key press
document.body.addEventListener('keydown', function (e) {
  const key = e.key;
  switch (key) {
    case "ArrowUp":
      jump()
      break;

    case "ArrowLeft":
      left()
      break;
    case "ArrowRight":
      right()
  }
});