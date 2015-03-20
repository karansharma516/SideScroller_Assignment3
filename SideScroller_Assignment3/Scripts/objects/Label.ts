/// <reference path="../../constants.ts" />

/**
File: Label.ts
Author: Karan Sharma
Description: This class contains all the details to initialize the Label objects
Last Modified : March 19, 2015
*/

module objects {
    // LABEL Class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    export class Label extends createjs.Text {
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++
        constructor(x: number, y: number, labelText: string) {
            super(labelText, constants.LABEL_FONT, constants.LABEL_COLOUR);
            this.regX = this.getMeasuredWidth() * 0.5;
            this.regY = this.getMeasuredHeight() * 0.5;
            this.x = x;
            this.y = y;
        }
    }
}   