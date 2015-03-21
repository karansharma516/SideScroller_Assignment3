/**
File: game.ts
Author: Karan Sharma
Description: This game Nemo Fighter is created with the extensive use of javascript.
At the begining of the game user will see the two buttons, one is for the instructions
which tells the user how to play this game and about the controls and other button is
to selct the player of the game. Once user select his player then game will start and
it displays the score board at the top of the screen and also displays the message 
When player wins or lost.
Last Modified : March 19, 2015

Version History:

Version #1.0 
- created the base game by adding the assets and initiate it

Version #1.1
- added game objects to the game and implement it

Version #1.2
- added the sound effects and tested the collision working

Version #1.3
- added game container to the game

Version #1.4
- added button class and contant file to the game

Version #1.5
- added Label class to the game

Version #1.6
- added scoreboard object which will displays the scoreboard of the game
-In this version, we check that score increases whenever player hit with the ring and
 lives decreases whenever it hits with the bees

Version #1.7
- created the play sate and encapsulated the game into play state 
-It makes program more clear and understandable to anybody. 

Version #1.8
- made changes in the check collision and made it working

Version #1.9
- added game over state to the game which will displays the game over message
- added try again button to the game over state which will take the user to the menu state. 

Version #1.10
- added menu state to the game and the play button is displayed and the Instruction button.

Version #1.11
- added functionality of destroying the bees and rings whenever its collides with Nemo
- In this version, bees are not destroyed when they collide with the player but then fix that error

Version #1.12
- added instruction state to the game which will displays the instructions of the game to the user
-Added back  button to the instruction state which take the user to the main screen.

Version #1.13 
- added and changed the sound effects of the game 

Version #1.14
- added gem object to the game which will increase the lives of the player

Version #1.15
- added player selection state to the game by which user can select their own player
- remove play button from the main screen and replaced with the player select button

Version #1.16
- completed most of the internal documentation and remove non usable code from the game.
- made changes in the instruction message

Version #1.17
- added text label to the menu state and made some changes in the sound effects

Version #1.18
-Added functionality that when player has the score of 3000 then player will start receiving gems which will increase the lives of the game. 
-Added sound of the button to the game.
-Edit the instruction message. 

*/


/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />

/// <reference path="../constants.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="objects/background.ts" />
/// <reference path="objects/nemo.ts" />
/// <reference path="objects/bee.ts" />
/// <reference path="objects/ring.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="states/play.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/instruction.ts" />
/// <reference path="objects/gem.ts" />
/// <reference path="objects/nemo_2.ts" />
/// <reference path="states/gameplay.ts" />
/// <reference path="states/select.ts" />


// Game Variables
var stats: Stats = new Stats();
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;


// Score Variables
var finalScore: number = 0;
var highScore = 0;
var score: objects.ScoreBoard;
var finalText: string;

var bee: number;

// state variables
var currentState: number;
var currentStateFunction: any;
var stateChanged: boolean = false;


// Game Objects
var gameOver: states.GameOver;
var gamePlay: states.Play;
var menu: states.Menu;
var instruction: states.Instruction;
var select: states.Select;
var playGame: states.GamePlay;

// asset manifest - array of asset objects
var manifest = [
    { id: "bee", src: "assets/images/bee.png" },
    { id: "ring", src: "assets/images/ring.png" },
    { id: "background", src: "assets/images/background.png" },
    { id: "nemo", src: "assets/images/Nemo.png" },
    { id: "nemo_2", src: "assets/images/Nemo3.png" },
    { id: "tryAgainButton", src: "assets/images/tryagain.png" },
    { id: "playButton", src: "assets/images/play.png" },
    { id: "selectButton", src: "assets/images/select.png" },
    { id: "player_1_Button", src: "assets/images/player1.png" },
    { id: "player_2_Button", src: "assets/images/player2.png" },
    { id: "gem", src: "assets/images/gems.png" },
    { id: "backButton", src: "assets/images/back.png" },
    { id: "bullet", src: "assets/images/bullet.png" },
    { id: "engine", src: "assets/audio/engine.mp3" },
    { id: "instructionButton", src: "assets/images/instruction.png" },
    { id: "yay", src: "assets/audio/ring.mp3" },
    { id: "gemSound", src: "assets/audio/gem.wav" },
    { id: "buttonClick", src: "assets/audio/buttonClick.mp3" },
    { id: "thunder", src: "assets/audio/collision.wav" }

];

/*
 * This function preloads all of the assets in the game.
 */
function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
}

/*
 * This function initializes the game by setting up the canvas, FPS and enabling mouseover
 */
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    setupStats();

    currentState = constants.MENU_STATE;
    changeState(currentState);
}

// UTILITY METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function setupStats() {
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '650px';
    stats.domElement.style.top = '440px';
    document.body.appendChild(stats.domElement);
}

/*
 * This function updates the game as it is being played.
 */
function gameLoop() {
    stats.begin(); // Begin metering

    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }

    stage.update();
    stats.end(); // End metering
}

/*
 * This function call the different states.
 */
function changeState(state: number): void {
    // Launch Various "screens"
    switch (state) {
            
        case constants.MENU_STATE:
            // instantiate menu screen
            menu = new states.Menu();
            currentStateFunction = menu;
            break;

        case constants.PLAY_STATE:
            // instantiate game play screen
            gamePlay = new states.Play();
            currentStateFunction = gamePlay;
            break;

        case constants.GAME_OVER_STATE:
            // instantiate game over screen
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;

        case constants.INSTRUCTION_STATE:
            // instantiate game over screen
            instruction = new states.Instruction();
            currentStateFunction = instruction;
            break;

        case constants.SELECT_STATE:
            // instantiate game over screen
            select = new states.Select();
            currentStateFunction = select;
            break;

        case constants.PLAY_STATE_2:
            // instantiate game play screen
            playGame = new states.GamePlay();
            currentStateFunction = playGame;
            break;

    }
}

