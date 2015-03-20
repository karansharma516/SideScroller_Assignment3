﻿/**
File: ScoreBoard.ts
Author: Karan Sharma
Description:  This class set the displays the score of the player
Last Modified : March 19, 2015
*/

module objects {
    // SCOREBOARD CLASS ++++++++++++++++++++++++++++++++++++++++
    export class ScoreBoard {
        // PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++++++++
        public lives: number;
        public score: number;

        // PRIVATE INSTANCES VARIABLES +++++++++++++++++++++++++++++++++++++
        private _scoreLabel: createjs.Text;
        private _livesLabel: createjs.Text;
        private _game: createjs.Container;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++
        constructor(game: createjs.Container) {
            this.score = 0;
            this.lives = 5;
            this._livesLabel = new createjs.Text("Lives: ", "40px Consolas", "#ffff00");
            game.addChild(this._livesLabel);

            this._scoreLabel = new createjs.Text("Score: ", "40px Consolas", "#ffff00");
            this._scoreLabel.x = 400;
            game.addChild(this._scoreLabel);

        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++
        public update(): void {
            this._livesLabel.text = "Lives: " + this.lives;
            this._scoreLabel.text = "Score: " + this.score;
        }
    }
}   