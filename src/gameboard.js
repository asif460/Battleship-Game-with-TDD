import { Ship } from "./ship.js";

export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.grid = this.createGrid();
    this.missedAttacks = [];
    this.ships = [];
  }

  createGrid() {
    return Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => ({ hit: false, ship: null }))
    );
  }

  resetGameboard() {
    this.grid = this.createGrid();
    this.missedAttacks = [];
    this.ships = [];
  }

  placeShip(length, startCoords, isHorizontal) {
    const [startX, startY] = startCoords;
    const ship = new Ship(length);

    if (!this.isValidPlacement(length, startCoords, isHorizontal)) {
      throw new Error("Invalid placement");
    }

    this.ships.push(ship);

    for (let i = 0; i < length; i++) {
      const x = isHorizontal ? startX : startX + i;
      const y = isHorizontal ? startY + i : startY;
      this.grid[x][y].ship = ship;
    }
  }

  isValidPlacement(length, [startX, startY], isHorizontal) {
    for (let i = 0; i < length; i++) {
      const x = isHorizontal ? startX : startX + i;
      const y = isHorizontal ? startY + i : startY;

      if (x >= this.size || y >= this.size || this.grid[x][y].ship !== null) {
        return false;
      }
    }
    return true;
  }

  receiveAttack(coords) {
    const [x, y] = coords;
    const cell = this.grid[x][y];

    if (cell.ship) {
      cell.hit = true;
      cell.ship.hit();
      if (cell.ship.isSunk()) {
        this.markSunkShip(cell.ship);
      }
    } else {
      this.missedAttacks.push(coords);
    }
  }

  markSunkShip(ship) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.grid[x][y].ship === ship) {
          this.grid[x][y].sunk = true;
        }
      }
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  isAlreadyAttacked(coords) {
    const [x, y] = coords;
    const cell = this.grid[x][y];

    if (
      this.missedAttacks.some((attack) => attack[0] === x && attack[1] === y)
    ) {
      return true;
    }
    if (cell.ship && cell.hit) {
      return true;
    }
    return false;
  }
}