/**
File: nemo.ts
Author: Karan Sharma
Description: This file class the position of the Nemo 
Last Modified : March 19, 2015
*/

module objects {

    export class Nemo extends createjs.Bitmap {
         // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++
        public width: number;
        public height: number;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This constructor creates creates nemo(player) at its position
         */
        constructor() {
            super(assetLoader.getResult("nemo"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this.x = 80;

            createjs.Sound.play("engine", { loop: -1 });

        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method updates the player position
         */
        public update() {
            this.y = stage.mouseY;
            
        }
    }

}  