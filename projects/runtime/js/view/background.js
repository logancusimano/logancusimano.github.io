var background = function (window) {
    'use strict';

    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;

    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;

        // container which will be returned
        var background;
        var tree;
        var buildings = [];

        // ANIMATION VARIABLES HERE:


        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious
            // you should modify this to suit your game
            var backgroundGround = draw.rect(canvasWidth,canvasHeight,'#2d1606');
            background.addChild(backgroundGround);

            var backgroundGrass = draw.rect(canvasWidth,groundY+75,'DarkGreen');
            background.addChild(backgroundGrass);

            var backgroundSky = draw.rect(canvasWidth,groundY,'Black');
            background.addChild(backgroundSky);

            // TODO: 3 - Add a moon and starfield
            var circle;
            for(var i=0;i<100;i++) {
                circle = draw.circle(10,'white','white',2);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            var moon = draw.bitmap('img/moon.png');
                moon.x = 300;
                moon.y = groundY-300;
                moon.scaleX = 0.5;
                moon.scaleY = 0.5;
                background.addChild(moon);
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?

                var buildingHeight = [300,250,200,275,325,175,300];
                var building;
                    for(var b=0;b<7;++b) {
                        building = draw.rect(100,buildingHeight[b],'grey','Black',3);
                        building.x = 200*b;
                        building.y = groundY-buildingHeight[b];
                        background.addChild(building);
                        buildings.push(building);
                }



            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = 700;
            tree.y = groundY-200;
            background.addChild(tree);


        } // end of render function - DO NOT DELETE


        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1;
            if(tree.x < -200) {
            tree.x = canvasWidth;
}
            // TODO 5: Part 2 - Parallax
           for (var i = 0; i < buildings.length; i++){
            var building = buildings[i];
            building.x = building.x - 2;
            if(building.x < -200) {
            building.x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE



        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;

        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);

        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
