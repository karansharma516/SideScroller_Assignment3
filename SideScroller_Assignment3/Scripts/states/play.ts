/// <reference path="../objects/ring.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/bee.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/nemo.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../../constants.ts" />




module states {
    // PLAY STATE
    export class Play {
        // INSTANCE VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++
        public game: createjs.Container;
        public nemo: objects.Nemo;
        public ring: objects.Ring;
        public bees: objects.Bee[] = [];
        public background: objects.Background;
        public scoreboard: objects.ScoreBoard;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            // Add ocean to game
            this.background = new objects.Background();
            this.game.addChild(this.background);


            // Add island to game
            this.ring = new objects.Ring();
            this.game.addChild(this.ring);


            // Add plane to game
            this.nemo = new objects.Nemo();
            this.game.addChild(this.nemo);

            // Add clouds to game
            for (var cloud = constants.CLOUD_NUM; cloud > 0; cloud--) {
                this.bees[cloud] = new objects.Bee();
                this.game.addChild(this.bees[cloud]);
            }

            this.scoreboard = new objects.ScoreBoard(this.game);



            stage.addChild(this.game);
        } // constructor end


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Calculate the distance between two points
        distance(p1: createjs.Point, p2: createjs.Point): number {

            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } // distance end

     
        // CHeck Collision Method
        checkCollision(collider: objects.GameObject) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.nemo.x;
            p1.y = this.nemo.y;
            p2.x = collider.x;
            p2.y = collider.y;
            // Check for Collision
            if (this.distance(p2, p1) < ((this.nemo.height * 0.5) + (collider.height * 0.5))) {
                if (!collider.isColliding) { // Collision has occurred
                    createjs.Sound.play(collider.soundString);
                    collider.isColliding = true;
                    switch (collider.name) {
                        case "ring":
                            this.scoreboard.score += 100;
                           
                            break;
                        case "bee":
                            this.scoreboard.lives--;
                            break;
                    }
                }
            } else {
                collider.isColliding = false;
            }
        } // checkCollision end

        // UPDATE METHOD
        public update() {

            this.background.update();
            this.nemo.update();
            this.ring.update();

            if (this.scoreboard.lives > 0) {
                for (var cloud = constants.CLOUD_NUM; cloud > 0; cloud--) {
                    this.bees[cloud].update();
                    this.checkCollision(this.bees[cloud]);
                }

                this.checkCollision(this.ring);
            }

            this.scoreboard.update();

            if (this.scoreboard.lives < 1) {
                createjs.Sound.stop();
                this.game.removeAllChildren();
                stage.removeAllChildren();
            }
        } // update method end


    }
}  