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
File: Menu.ts
Author: Karan Sharma
Description: This class displays the menu state of the game. 
Last Modified : March 19, 2015
*/

module states {
    // MENU STATE CLASS
    export class Menu {
        // Game Objects         
        public game: createjs.Container;
        public background: objects.Background;
        public playButton: objects.Button;
        public selectButton: objects.Button;
        public mailPilotLabel: objects.Label;
        public instructionButton: objects.Button;
        public play: boolean = false;
     
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {

            createjs.Sound.play("engine", { loop: -1 });

            // Instantiate Game Container
            this.game = new createjs.Container();

            //Ocean object
            this.background = new objects.Background();
            this.game.addChild(this.background);

            //Game Over Label
            this.mailPilotLabel = new objects.Label(320, 40, "NEMO FIGHTER");
            this.mailPilotLabel.font = "60px Consolas";
            this.mailPilotLabel.regX = this.mailPilotLabel.getMeasuredWidth() * 0.5;
            this.mailPilotLabel.regY = this.mailPilotLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.mailPilotLabel);

            // instruction button
            this.instructionButton = new objects.Button("instructionButton", 450, 280);
            this.instructionButton.on("click", this.instructionClicked, this);

            this.game.addChild(this.instructionButton);

            // instruction button
            this.selectButton = new objects.Button("selectButton", 150, 280);
            this.selectButton.on("click", this.selectClicked, this);

            this.game.addChild(this.selectButton);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor
        
       // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method displays the instruction state
         */
        public instructionClicked() {
            this.game.removeAllChildren();
            stage.removeChild(this.game);
            currentState = constants.INSTRUCTION_STATE;
            changeState(currentState);
        }

        /**
         * This method displays the select state
         */
        public selectClicked() {
            this.game.removeAllChildren();
            stage.removeChild(this.game);
            currentState = constants.SELECT_STATE;
            changeState(currentState);
        }

    // UPDATE METHOD
        public update() {
            this.background.update();
            stage.update(); // Refreshes our stage

        } // Update Method

    }
}// Menu Class 