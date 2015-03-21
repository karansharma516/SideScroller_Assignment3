/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/ring.ts" />
/// <reference path="../objects/nemo.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/bee.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../../constants.ts" />
/// <reference path="../objects/gem.ts" />


/**
File: gameOver.ts
Author: Karan Sharma
Description: This class displays the game over state when player lost or won. 
Last Modified : March 19, 2015
*/

module states {
    // GAME OVER STATE CLASS
    export class GameOver {
        // Game Objects 
        public game: createjs.Container;
        public background: objects.Background;
        public gameOverLabel: objects.Label;
        public gameWinLabel: objects.Label;
        public finalScoreLabel: objects.Label;
        public highScoreLabel: objects.Label;
        public tryAgainButton: objects.Button;
        public tryAgain: boolean = false;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            //Ocean object
            this.background = new objects.Background();
            this.game.addChild(this.background);

            //Game Over Label
            this.gameOverLabel = new objects.Label(320, 40, finalText);
            this.gameOverLabel.font = "60px Consolas";
            this.gameOverLabel.regX = this.gameOverLabel.getMeasuredWidth() * 0.5;
            this.gameOverLabel.regY = this.gameOverLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.gameOverLabel);

            // Game Win Label
            this.gameWinLabel = new objects.Label(320, 40, finalText);
            this.gameWinLabel.font = "60px Consolas";
            this.gameWinLabel.regX = this.gameWinLabel.getMeasuredWidth() * 0.5;
            this.gameWinLabel.regY = this.gameWinLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.gameWinLabel);

            //Final Score Label
            this.finalScoreLabel = new objects.Label(320, 120,("FINAL SCORE: " + finalScore));
            this.game.addChild(this.finalScoreLabel);

            //Final Score Label
            this.highScoreLabel = new objects.Label(320, 220,("HIGH SCORE: " + highScore));
            this.game.addChild(this.highScoreLabel);

            //Try Again Button
            this.tryAgainButton = new objects.Button("tryAgainButton", 320, 350);
            this.game.addChild(this.tryAgainButton);
            this.tryAgainButton.on("click", this.tryAgainClicked, this);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor

         // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public tryAgainClicked() {
            this.tryAgain = true;
        }

       // UPDATE METHOD
        public update() {

            this.background.update();

            if (this.tryAgain) {
                createjs.Sound.play("buttonClick");
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.MENU_STATE;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method

    } // Game Over Class


} // States Module 