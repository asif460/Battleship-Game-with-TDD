import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(name = "Computer", isHuman = false) {
    this.name = name;
    this.isHuman = isHuman;
    this.gameboard = new Gameboard();
  }

  attack(enemyGameboard, coords) {
    if (!enemyGameboard.isAlreadyAttacked(coords)) {
      enemyGameboard.receiveAttack(coords);
      return true;
    }
    return false;
  }
}