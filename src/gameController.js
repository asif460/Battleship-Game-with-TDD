import { Player } from "./player.js";
import { renderGameboard } from "./domManager.js";

const player = new Player("Human", true);
const computer = new Player("Computer");

placeShipsRandomly(computer.gameboard);

renderGameboard(player.gameboard, "playerBoard");
renderGameboard(computer.gameboard, "computerBoard");

addGridLabels("playerBoard");
addGridLabels("computerBoard");

let gameStarted = false;
let gameOver = false;

document.getElementById("computerBoard").addEventListener("click", (event) => {
  if (gameOver) return;

  if (
    event.target.classList.contains("cell") &&
    !event.target.classList.contains("disabled")
  ) {
    if (!gameStarted && player.gameboard.ships.length === 0) {
      showModal("You must place your ships first!");
      return;
    }

    const x = parseInt(event.target.dataset.x, 10);
    const y = parseInt(event.target.dataset.y, 10);
    const coords = [x, y];

    if (!computer.gameboard.isAlreadyAttacked(coords)) {
      gameStarted = true;
      document.getElementById("randomPlaceButton").disabled = true;
      computer.gameboard.receiveAttack(coords);
      renderGameboard(computer.gameboard, "computerBoard");

      if (computer.gameboard.allShipsSunk()) {
        gameOver = true;
        showModal("You win! All computer ships are sunk.");
        document.getElementById("playAgainButton").style.display =
          "inline-block";
      } else {
        computerAttack();
      }
    }
  }
});

document.getElementById("randomPlaceButton").addEventListener("click", () => {
  player.gameboard.resetGameboard();
  placeShipsRandomly(player.gameboard);
  renderGameboard(player.gameboard, "playerBoard");
});

document.getElementById("playAgainButton").addEventListener("click", () => {
  resetGame();
  document.getElementById("modal").style.display = "none";
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

let lastHit = null;

function computerAttack() {
  if (gameOver) return;

  let attacked = false;
  const potentialTargets = [];

  if (lastHit) {
    const [x, y] = lastHit;
    const adjacentCells = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    adjacentCells.forEach((coords) => {
      const [adjX, adjY] = coords;
      if (
        adjX >= 0 &&
        adjX < 10 &&
        adjY >= 0 &&
        adjY < 10 &&
        !player.gameboard.isAlreadyAttacked(coords)
      ) {
        potentialTargets.push(coords);
      }
    });
  }

  if (potentialTargets.length > 0) {
    const coords =
      potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
    player.gameboard.receiveAttack(coords);
    renderGameboard(player.gameboard, "playerBoard");
    attacked = true;

    if (player.gameboard.grid[coords[0]][coords[1]].hit) {
      lastHit = coords;
    } else {
      lastHit = null;
    }
  } else {
    while (!attacked) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const coords = [x, y];

      if (!player.gameboard.isAlreadyAttacked(coords)) {
        player.gameboard.receiveAttack(coords);
        renderGameboard(player.gameboard, "playerBoard");
        attacked = true;

        if (player.gameboard.grid[x][y].hit) {
          lastHit = coords;
        }
      }
    }
  }

  if (player.gameboard.allShipsSunk()) {
    gameOver = true;
    showModal("Computer wins! All your ships are sunk.");
    document.getElementById("playAgainButton").style.display = "inline-block";
  }
}

function placeShipsRandomly(gameboard) {
  const ships = [5, 4, 3, 3, 2];
  for (const length of ships) {
    let placed = false;
    while (!placed) {
      const isHorizontal = Math.random() > 0.5;
      const startX = Math.floor(Math.random() * 10);
      const startY = Math.floor(Math.random() * 10);
      try {
        gameboard.placeShip(length, [startX, startY], isHorizontal);
        placed = true;
      } catch (e) {}
    }
  }
}

function showModal(message) {
  document.getElementById("modalMessage").textContent = message;
  document.getElementById("modal").style.display = "block";
}

function addGridLabels(boardId) {
  const columnLabels = document.querySelector(`#${boardId} .column-labels`);
  const rowLabels = document.querySelector(`#${boardId} .row-labels`);

  const columns = "ABCDEFGHIJ".split("");
  const rows = Array.from({ length: 10 }, (_, i) => i + 1);

  columns.forEach((label) => {
    const labelDiv = document.createElement("div");
    labelDiv.textContent = label;
    columnLabels.appendChild(labelDiv);
  });

  rows.forEach((label) => {
    const labelDiv = document.createElement("div");
    labelDiv.textContent = label;
    rowLabels.appendChild(labelDiv);
  });
}

function resetGame() {
  gameStarted = false;
  gameOver = false;

  player.gameboard.resetGameboard();
  computer.gameboard.resetGameboard();

  placeShipsRandomly(player.gameboard);
  placeShipsRandomly(computer.gameboard);

  renderGameboard(player.gameboard, "playerBoard");
  renderGameboard(computer.gameboard, "computerBoard");

  document.getElementById("randomPlaceButton").disabled = false;
  document.getElementById("playAgainButton").style.display = "none";
}