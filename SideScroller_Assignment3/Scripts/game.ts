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

// var bullet: objects.Bullet;
// var bullets: objects.Bullet [] = [];

var stats: Stats = new Stats();
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;

// Game Objects

var finalText: string;

// Score Variables
var finalScore: number = 0;
var highScore = 0;
var score: objects.ScoreBoard;

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
    { id: "thunder", src: "assets/audio/thunder.wav" }

];

// Game Objects 

function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
}


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

