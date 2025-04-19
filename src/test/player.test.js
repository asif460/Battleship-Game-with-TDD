import { Player } from "../player";
import { Gameboard } from "../gameboard";

describe("Player", () => {
  test("should initialize a human player with a name and gameboard", () => {
    const player = new Player("Alice", true);
    expect(player.name).toBe("Alice");
    expect(player.isHuman).toBe(true);
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("should initialize a computer player with a default name and gameboard", () => {
    const player = new Player();
    expect(player.name).toBe("Computer");
    expect(player.isHuman).toBe(false);
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("should allow setting a custom name for a computer player", () => {
    const player = new Player("AI Bot", false);
    expect(player.name).toBe("AI Bot");
    expect(player.isHuman).toBe(false);
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });
});