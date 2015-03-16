module objects {

    export class Bee extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("bee");

           

            this._reset();

        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        private _reset() {
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