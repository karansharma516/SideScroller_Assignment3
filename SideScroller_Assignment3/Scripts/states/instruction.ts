/// <reference path="../objects/button.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/bee.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/nemo.ts" />
/// <reference path="../objects/ring.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../game.ts" />
/// <reference path="../../constants.ts" />

/**
File: Select.ts
Author: Karan Sharma
Description: This class displays the insruction of the game. 
Last Modified : March 19, 2015
*/

module states {
    export class Instruction {
      // Game objects
        public game: createjs.Container;
        public background: objects.Background;
        public instructionText: createjs.Text;
        public backButton: objects.Button;
        public play: boolean = false;

        constructor() {
            
            // Instantiate Game Container
            this.game = new createjs.Container();

            //Ocean object
            this.background = new objects.Background();
            this.game.addChild(this.background);
            
            // instruction message
            var instructionsMessage: string = "Welcome to Nemo Fighter game,Nemo's was attacked by enemies, "
                + "you need to save nemo from the bees and save his life. "
                + "In order to win this game,you need to collect 5000 points!" 
                + "you get the 100 points for each ring and increase lives by 1 for each gem" 
                + "Steer with the mouse, Lets See how many points you can Get!";

            this.instructionText = new createjs.Text(instructionsMessage, "30px Consolas", constants.LABEL_COLOUR);
            // setting thre position of the instruction message
            this.instructionText.y = 15;
            this.instructionText.x = 25;
            this.instructionText.lineHeight = 35;
            this.instructionText.lineWidth = 600;
            this.game.addChild(this.instructionText);
 
            //back Button
            this.backButton = new objects.Button("backButton", 300, 420);
            this.backButton.on("click", this.backClicked, this);
            this.game.addChild(this.backButton);

            stage.addChild(this.game);
        }

        public backClicked() {
            this.play = true;
        }

        // UPDATE METHOD
        public update() {

            this.background.update();
            
            // instructionText.visible = true;  
            if (this.play) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.MENU_STATE;
                stateChanged = true;
            }
            stage.update();

        }
    }
} 