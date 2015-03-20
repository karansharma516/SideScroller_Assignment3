/**
File: Gem.ts
Author: Karan Sharma
Description:  This class set the position of the gem objects
Last Modified : March 16, 2015
*/

module objects {

    export class Gem extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("gem");
            this.name = "gem";
            this._dx = 3;
            this.soundString = "gemSound";

            this._reset();

        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        public _reset() {

            // set the island to start at a random x value

            // set the island to start at a random x value
            this.x = 640 + Math.floor(Math.random() * 640);
            this.y = Math.floor(Math.random() * 480);
        }

        private _checkBounds() {
            if (this.x <= 0) {
                this._reset();
            }
        }


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++

        public update() {
            this.x -= this._dx;
            
            this._checkBounds();
        }


    }

}   