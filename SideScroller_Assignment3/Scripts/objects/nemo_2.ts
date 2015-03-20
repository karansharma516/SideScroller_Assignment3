/**
File: Nemo_2.ts
Author: Karan Sharma
Description: This class has the details of the initializes the Nemo 
Last Modified : March 19, 2015
*/

module objects {

    export class Nemo_2 extends createjs.Bitmap {
        // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++
        public width: number;
        public height: number;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This constructor creates creates nemo2(player) at its position
         */
        constructor() {
            super(assetLoader.getResult("nemo_2"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this.x = 80;

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