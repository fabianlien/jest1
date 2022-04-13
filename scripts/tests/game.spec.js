/**
 * @jest-environment jsdom
 */

const { TestWatcher } = require("jest");
const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game");


beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contains the correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    })
});

describe("newGame works", () => {
    beforeAll(() => {
        game.score = 42;
        game.turnNumber = 42;
        game.playerMoves = [1, 2, 3]
        game.currentGame = [1, 2 ,3]
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("reset the game score", () => {
        expect(game.score).toEqual(0);
    });
    test("reset game.turnNumber", () => {
        expect(game.turnNumber).toEqual(0);
    });
    test("reset playermoves", () => {
        expect(game.playerMoves).toEqual([])
    });
    test("should be one move in computers array", () => {
        expect(game.currentGame.length).toBe(1)
    });
    test("should display 0 for id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

describe("gameplay works", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn works", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttonas", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    })
});