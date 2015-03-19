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
/// <reference path="../constants.ts" />
// Game Variables
var stats = new Stats();
var canvas;
var stage;
var assetLoader;
// Game Objects
var play;
// asset manifest - array of asset objects
var manifest = [
    { id: "bee", src: "assets/images/bee.png" },
    { id: "ring", src: "assets/images/ring.png" },
    { id: "background", src: "assets/images/background.png" },
    { id: "nemo", src: "assets/images/nemo.png" },
    { id: "engine", src: "assets/audio/engine.ogg" },
    { id: "yay", src: "assets/audio/yay.ogg" },
    { id: "thunder", src: "assets/audio/thunder.ogg" }
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
    main();
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
    play.update();
    stage.update(); // Refreshes our stage
    stats.end(); // End metering
}
// Our Game Kicks off in here
function main() {
    // Instantiate my Play State
    play = new states.Play();
}
//# sourceMappingURL=game.js.map