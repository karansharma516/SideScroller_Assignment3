module objects {

    export class Ring extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("ring");
            this.name = "ring";
            this._dx = 5;
            this.soundString = "yay";

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