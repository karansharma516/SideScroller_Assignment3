/**
File: GameObject.ts
Author: Karan Sharma
Description:  This class is the base class for the other class
Last Modified : March 16, 2015
*/
module objects {

    export class GameObject extends createjs.Bitmap {
        // PUBLIC VARIABLES
        public width: number;
        public height: number;
        public isColliding: boolean;
        public soundString: string;

        // PRIVATE VARIABLE
        protected _dy;
        protected _dx;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor(assetString:string) {
            super(assetLoader.getResult(assetString));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this.isColliding = false;
        }


    }

}   