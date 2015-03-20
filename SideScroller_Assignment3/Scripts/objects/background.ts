/**
File: background.ts
Author: Karan Sharma
Description: This class the position of the background of the game
Last Modified : March 16, 2015
*/

module objects {

    export class Background extends createjs.Bitmap {
        // PUBLIC VARIABLES
        public width;
        public height;

        // PRIVATE VARIABLE
        private _dx = 5;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super(assetLoader.getResult("background"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this._reset();

        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        private _reset() {
            // set the island to start at a random x value
            this.x = 0;
            this.y = 0;
        }

        private _checkBounds() {
            if (this.x < -220) {
                this._reset();
                //1405
            }
        }


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
         /**
         * This method updates the backgroud and call the check bounds method
         */
        public update() {
            this.x -= this._dx;
            this._checkBounds();
        }


    }

}   