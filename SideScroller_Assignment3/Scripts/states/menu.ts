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


module states {
    // MENU STATE CLASS
    export class Menu {
        // Game Objects 
        
        public game: createjs.Container;
        public background: objects.Background;
        public playButton: objects.Button;

        public mailPilotLabel: objects.Label;
        public instructionButton: objects.Button;

        public play: boolean = false;
       

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            
          

            // Instantiate Game Container
            this.game = new createjs.Container();

            //Ocean object
            this.background = new objects.Background();
            this.game.addChild(this.background);

            //Game Over Label
            this.mailPilotLabel = new objects.Label(320, 40, "NEMO RING CHASER");
            this.mailPilotLabel.font = "60px Consolas";
            this.mailPilotLabel.regX = this.mailPilotLabel.getMeasuredWidth() * 0.5;
            this.mailPilotLabel.regY = this.mailPilotLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.mailPilotLabel);


            //Play Button
            this.playButton = new objects.Button("playButton", 150, 280);
            this.playButton.on("click", this.playClicked, this);

            this.game.addChild(this.playButton);
 
            // instruction button
            this.instructionButton = new objects.Button("instructionButton", 450, 280);
            this.instructionButton.on("click", this.instructionClicked, this);

            this.game.addChild(this.instructionButton);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor

        public playClicked() {
            this.play = true;
        }

        public instructionClicked() {
            this.game.removeAllChildren();
            stage.removeChild(this.game);
            currentState = constants.INSTRUCTION_STATE;
            changeState(currentState);
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public update() {

            this.background.update();
          

            if (this.play) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE;
                stateChanged = true;
            }

           

            stage.update(); // Refreshes our stage

        } // Update Method

    }
}// Menu Class 