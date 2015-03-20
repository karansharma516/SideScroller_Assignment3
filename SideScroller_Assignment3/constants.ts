/**
File: Constants.ts
Author: Karan Sharma
Description: This class has all constant variables that are used in the game 
Last Modified : March 19, 2015
*/

module constants {
    // State Machine Constants
    export var MENU_STATE: number = 0;
    export var PLAY_STATE: number = 1;
    export var GAME_OVER_STATE: number = 2;
    export var INSTRUCTION_STATE: number = 3;
    export var SELECT_STATE: number = 4;
    export var PLAY_STATE_2: number = 5;

    // Game Constants
    export var CLOUD_NUM: number = 3;
    export var LABEL_FONT = "40px Consolas";
    export var LABEL_COLOUR = "#FFFF00";
    export var PLANE_LIVES = 3;
}   