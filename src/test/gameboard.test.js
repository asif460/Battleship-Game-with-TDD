import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

describe("Gameboard", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("places a ship horizontally", () => {
    gameboard.placeShip(3, [0, 0], true);
    expect(gameboard.grid[0][0].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[0][1].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[0][2].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[0][3].ship).toBeNull();
  });

  test("places a ship vertically", () => {
    gameboard.placeShip(3, [0, 0], false);
    expect(gameboard.grid[0][0].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[1][0].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[2][0].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[3][0].ship).toBeNull();
  });

  test("throws error for invalid ship placement", () => {
    expect(() => gameboard.placeShip(5, [9, 9], true)).toThrow(
      "Invalid placement"
    );
    expect(() => gameboard.placeShip(5, [9, 9], false)).toThrow(
      "Invalid placement"
    );
  });

  test("receives attack and hits ship", () => {
    gameboard.placeShip(3, [0, 0], true);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.grid[0][0].ship.nbhit).toBe(1);
  });

  test("receives attack and misses", () => {
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
  });

  test("reports all ships sunk", () => {
    gameboard.placeShip(1, [0, 0], true);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test("reports not all ships sunk", () => {
    gameboard.placeShip(2, [0, 0], true);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test("marks ship as sunk when all parts are hit", () => {
    gameboard.placeShip(3, [0, 0], true);
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([0, 2]);
    expect(gameboard.grid[0][0].ship.isSunk()).toBe(true);
  });

  test("isAlreadyAttacked returns true for missed attack", () => {
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.isAlreadyAttacked([0, 0])).toBe(true);
  });

  test("isAlreadyAttacked returns false for unattacked coordinates", () => {
    expect(gameboard.isAlreadyAttacked([0, 0])).toBe(false);
  });

  test("does not place ship over another ship", () => {
    gameboard.placeShip(3, [0, 0], true);
    expect(() => gameboard.placeShip(2, [0, 1], true)).toThrow(
      "Invalid placement"
    );
  });
});