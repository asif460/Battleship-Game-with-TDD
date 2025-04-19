export function renderGameboard(gameboard, elementId) {
    const gridElement = document.getElementById(elementId).querySelector(".grid");
    gridElement.innerHTML = "";
  
    gameboard.grid.forEach((row, x) => {
      row.forEach((cell, y) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.x = x;
        cellElement.dataset.y = y;
  
        if (cell.ship && elementId === "playerBoard") {
          cellElement.classList.add("ship");
        }
        if (cell.hit) {
          cellElement.classList.add("hit");
        }
        if (cell.sunk) {
          cellElement.classList.add("sunk");
        } else if (
          gameboard.missedAttacks.some(
            (attack) => attack[0] === x && attack[1] === y
          )
        ) {
          cellElement.classList.add("miss");
        }
  
        gridElement.appendChild(cellElement);
      });
    });
  }