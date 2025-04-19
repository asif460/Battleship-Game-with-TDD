import { Ship } from "../ship";

test("creates a ship with the correct length", () => {
  const ship = new Ship(4);
  expect(ship.length).toBe(4);
});

test("increases hit count when hit", () => {
  const ship = new Ship(4);
  ship.hit();
  expect(ship.nbhit).toBe(1);
});

test("ship is sunk when hit count equals length", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("ship is not sunk when hit count is less than length", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});