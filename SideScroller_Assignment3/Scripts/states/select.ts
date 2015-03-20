/// <reference path="../objects/background.ts" />
/// <reference path="../objects/bee.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/nemo.ts" />
/// <reference path="../objects/ring.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../../constants.ts" />
/// <reference path="instruction.ts" />
/// <reference path="../objects/gem.ts" />

/**
File: Select.ts
Author: Karan Sharma
Description: This class ask the user to selct your player and then starts the game depends on the selection of the user 
Last Modified : March 19, 2015
*/

module states {
    // MENU STATE CLASS
    export class Select {
        // Game Objects 
        public game: createjs.Container;
        public background: objects.Background;
        public player_1Button: objects.Button;
        public player_2Button: objects.Button;
        public player1_Image: createjs.Bitmap;
        public player2_Image: createjs.Bitmap;
        public player_1: boolean = false;
        public player_2: boolean = false;
       

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            //Ocean object
            this.background = new objects.Background();
            this.game.addChild(this.background);

            // sets the position of the image of Player1 
            this.player1_Image = new createjs.Bitmap("assets/images/Nemo.png");
            this.player1_Image.x = 100;
            this.player1_Image.y = 150;
            this.game.addChild(this.player1_Image);

            // sets the position of the image of the player2
            this.player2_Image = new createjs.Bitmap("assets/images/Nemo3.png");
            this.player2_Image.x = 400;
            this.player2_Image.y = 150;
            this.game.addChild(this.player2_Image);

           //Play Button
            this.player_1Button = new objects.Button("player_1_Button", 150, 280);
            this.player_1Button.on("click", this.player_1Clicked, this);
            this.game.addChild(this.player_1Button);
 
            //Play Button
            this.player_2Button = new objects.Button("player_2_Button", 450, 280);
            this.player_2Button.on("click", this.player_2Clicked, this);
            this.game.addChild(this.player_2Button);

            // Add Game Container to Stage
            stage.addChild(this.game);

        } // Constructor

       // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
        public player_1Clicked() {
            this.player_1 = true;
        }

        public player_2Clicked() {
            this.player_2 = true;
        }

        
        public update() {
            // update the background
            this.background.update();
            // play the game by selecting the player1 
            if (this.player_1) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE;
                stateChanged = true;
            }

            // play the game by selecting the player2
            if (this.player_2) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE_2;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method

    }
}// Menu Class 