/**
File: Bee.ts
Author: Karan Sharma
Description:  This class set the position of the bee objects
Last Modified : March 16, 2015
*/

module objects {

    export class Bee extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("bee");
            this.name = "bee";
            this.soundString = "thunder";

            this._reset();

        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        public _reset() {
            this._dx = Math.floor(Math.random() * 5) + 5;
            this._dy = Math.floor(Math.random() * 4) - 2;

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