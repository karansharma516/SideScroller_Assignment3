/// <reference path="../objects/ring.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/bee.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/nemo.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../../constants.ts" />
/// <reference path="gameover.ts" />
/// <reference path="instruction.ts" />
/// <reference path="../objects/gem.ts" />
/// <reference path="../objects/nemo_2.ts" />


/**
File: gamePlay.ts
Author: Karan Sharma
Description: This class displays the plays the game when the user selcts the player 2. 
Last Modified : March 19, 2015
*/

module states {
    // PLAY STATE
    export class GamePlay {
        // PUBLIC VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++
        public game: createjs.Container;
        public nemo_2: objects.Nemo_2;
        public ring: objects.Ring;
        public bees: objects.Bee[] = [];
        public background: objects.Background;
        public scoreboard: objects.ScoreBoard;
        public gem: objects.Gem;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            // Add background to game
            this.background = new objects.Background();
            this.game.addChild(this.background);


            // Add ring to game
            this.ring = new objects.Ring();
            this.game.addChild(this.ring);


            // Add nemo to game
            this.nemo_2 = new objects.Nemo_2();
            this.game.addChild(this.nemo_2);

            // Add gem to game
            this.gem = new objects.Gem();
            this.game.addChild(this.gem);

            // Add clouds to game
            for (bee = constants.CLOUD_NUM; bee > 0; bee--) {
                this.bees[bee] = new objects.Bee();
                this.game.addChild(this.bees[bee]);
            }

            this.scoreboard = new objects.ScoreBoard(this.game);
                     
            stage.addChild(this.game);

        } // constructor end

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Calculate the distance between two points
        distance(p1: createjs.Point, p2: createjs.Point): number {

            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } // distance end

     
        // CHeck Collision Method
        checkCollision(collider: objects.GameObject) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.nemo_2.x;
            p1.y = this.nemo_2.y;
            p2.x = collider.x;
            p2.y = collider.y;
            // Check for Collision
            if (this.distance(p2, p1) < ((this.nemo_2.height * 0.5) + (collider.height * 0.5))) {
                if (!collider.isColliding) { // Collision has occurred
                    createjs.Sound.play(collider.soundString);
                    collider.isColliding = true;
                    switch (collider.name) {
                        case "ring":
                            this.scoreboard.score += 100;
                            this.ring._reset();
                            break;
                        case "bee":
                            this.scoreboard.lives--;
                            this.bees[bee]._reset();
                            break;
                        case "gem":
                            this.scoreboard.lives++;
                            this.gem._reset();
                            break;
                    }
                }
            } else {
                collider.isColliding = false;
            }
        } // checkCollision end

        // UPDATE METHOD
        public update() {
            this.background.update();
            this.nemo_2.update();
            this.ring.update();
            if (this.scoreboard.score >= 3000) {
                this.gem.update();
            }
            
           // check collisions
            if (this.scoreboard.lives > 0) {
                for (bee = constants.CLOUD_NUM; bee > 0; bee--) {
                    this.bees[bee].update();
                    this.checkCollision(this.bees[bee]);
                }

                this.checkCollision(this.ring);
                this.checkCollision(this.gem);
            }

            this.scoreboard.update();
            // check if player lost 
            if (this.scoreboard.lives < 1) {
                createjs.Sound.play("thunder");
                createjs.Sound.stop();

                this.game.removeAllChildren();
                stage.removeAllChildren();

                if (finalScore > highScore) {
                    highScore = finalScore;
                }

                finalText = "YOU LOST";
                finalScore = this.scoreboard.score;

                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            }
            // check if player won
            if (this.scoreboard.score >= 5000) {
                createjs.Sound.play("yay");
                createjs.Sound.stop();
                this.game.removeAllChildren();
                stage.removeAllChildren();

                if (finalScore > highScore) {
                    highScore = finalScore;
                }

                finalText = "YOU WON";
                finalScore = this.scoreboard.score;

                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;

            }
        } // update method end


    }
}   