// Inits
window.onload = function init() {
    var game = new GF();
    game.start();
};

// GAME FRAMEWORK STARTS HERE
var GF = function () {
    // Vars relative to the canvas
    var canvas, ctx, w, h;

    // vars for handling inputs
    var inputStates = {};

    // game states
    var gameStates = {
        mainMenu: 0,
        gameRunning: 1,
        gameOver: 2
    };
    var currentGameState = gameStates.gameRunning;
    var currentLevel = 1;
    var TIME_BETWEEN_LEVELS = 3000; // 10 seconds
    var currentLevelTime = TIME_BETWEEN_LEVELS;
    var plopSound; // Sound of a ball exploding

    // The monster !
    var monster = {
        dead: false,
        x: 225,
        y: 650,
        width: 25,
        height: 25,
        speed: 600 // pixels/s this time !
    };   

    // The monster !
    var target = {
        x: 450*Math.random(),
        y: 450*Math.random(),
        width: 40,
        height: 40
    };

    // array of balls to animate
    var ballArray = [];
    var nbBalls = 1;

    // clears the canvas content
    function clearCanvas() {
        ctx.clearRect(0, 0, w, h);
    }

    // Functions for drawing the monster and maybe other objects
    function drawMyMonster(monster) {		
    	ctx.save();
	    ctx.fillStyle="#09A687";
	    ctx.fillRect(monster.x, monster.y, monster.width, monster.height);
        ctx.restore();
    }

    // Functions for drawing the monster and maybe other objects
    function drawMyTarget(target) {		
    	ctx.save();
	    ctx.fillStyle="#DA647F";
	    ctx.fillRect(target.x, target.y, target.width, target.height);
        ctx.restore();
    }

    
    var mainLoop = function (time) {
        //main function, called each frame 
        measureFPS(time);

        // number of ms since last frame draw
        delta = timer(time);

        // Clear the canvas
        clearCanvas();

        if (monster.dead) {
            currentGameState = gameStates.gameOver;
        }

        switch (currentGameState) {
            case gameStates.gameRunning:

                // draw the monster
                drawMyMonster(monster);
                drawMyTarget(target);

                // Check inputs and move the monster
                updateMonsterPosition(delta);

                // update and draw balls
                updateBalls(delta);

                // display Score
                displayScore();

                // decrease currentLevelTime. 
                // When < 0 go to next level
                currentLevelTime -= delta;

                if (currentLevelTime < 0) {
                    currentGameState = gameStates.gameOver;
                }


	            if(rectsOverlap(monster.x, monster.y,
	                monster.width, monster.height, target.x, target.y,
	                target.width, target.height)){
	            	plopSound.play();
	            	goToNextLevel();
	            }

                break;
            case gameStates.mainMenu:
                // TO DO !
                break;
            case gameStates.gameOver:
                ctx.fillText("GAME OVER \n TO LEVEL "+currentLevel, 50, 100);
                ctx.fillText("Press SPACE to start again", 50, 150);
                ctx.fillText("Move with arrow keys", 50, 200);
                ctx.fillText("Evitez les projectiles et faites attention au temps !", 50, 250);
                if (inputStates.space) {
                    startNewGame();
                }
                break;
        }

        // call the animation loop every 1/60th of second
        requestAnimationFrame(mainLoop);
    };

    function startNewGame() {
        monster.dead = false;
        currentLevelTime = 3000;
        currentLevel = 1;
        nbBalls = 1;
        monster.x = 225;
        monster.y = 650;
        createBalls(nbBalls);
        currentGameState = gameStates.gameRunning;
    }

    function goToNextLevel() {
        // reset time available for next level
        // 5 seconds in this example
        currentLevelTime = currentLevelTime+2000;
        currentLevel++;
        // Add two balls per level
        nbBalls += 1;
        target.x = 450*Math.random();
        target.y = 450*Math.random();
        createBalls(nbBalls);
        
    }

    function displayScore() {
        ctx.save();
        ctx.fillStyle = '#FF4422';
        ctx.font = "15pt Impact";
        ctx.fillText("Level : "+ currentLevel + " Balls: " + nbBalls + " Time " + (currentLevelTime / 1000).toFixed(1), w/4, 50);
        ctx.restore();
    }
    function updateMonsterPosition(delta) {
        monster.speedX = monster.speedY = 0;
        // check inputStates
        if (inputStates.left) {
            monster.speedX = -monster.speed;
        }
        if (inputStates.up) {
            monster.speedY = -monster.speed;
        }
        if (inputStates.right) {
            monster.speedX = monster.speed;
        }
        if (inputStates.down) {
            monster.speedY = monster.speed;
        }
        if (inputStates.space) {
        }
        if (inputStates.mousePos) {
        }
        if (inputStates.mousedown) {
            monster.speed = 600;
        } else {
            // mouse up
            monster.speed = 600;
        }
        // test if the monster collides with wall
        testCollisionCarreWithWalls(monster, w, h);

        // Compute the incX and inY in pixels depending
        // on the time elasped since last redraw
        monster.x += calcDistanceToMove(delta, monster.speedX);
        monster.y += calcDistanceToMove(delta, monster.speedY);
    }

    function updateBalls(delta) {
        // Move and draw each ball, test collisions, 
        for (var i = 0; i < ballArray.length; i++) {
            var ball = ballArray[i];

            // 1) move the ball
            ball.move();

            // 2) test if the ball collides with a wall
            testCollisionWithWalls(ball, w, h);
            // test if the monster collides with wall
            testCollisionCarreWithWalls(monster, w, h);

            // Test if the monster collides
            if (circRectsOverlap(monster.x, monster.y,
                    monster.width, monster.height,
                    ball.x, ball.y, ball.radius)) {

                //change the color of the ball
                ball.color = 'red';
                monster.dead = true;
                // Here, a sound effect greatly improves
                // the experience!
                plopSound.play();
            }

            

            // 3) draw the ball
            ball.draw(ctx);
            // Test if the target collides 
            test(target.x, target.y, target.width, target.height, ball);
        }
    }

function test(x0, y0, w0, h0, ball) {
          if(ball.x+ball.radius >= x0 && ball.y+ball.radius >= y0 && ball.x-ball.radius <= x0+w0 && ball.y-ball.radius <= y0+h0){
            if (ball.x+ball.radius >= x0 || ball.x-ball.radius <= x0+w0) {
                ball.angle = -ball.angle + Math.PI;
				console.log('x');
            }
            if (ball.y+ball.radius >= y0 || ball.y-ball.radius <= y0+h0) {
                ball.angle = -ball.angle;
				console.log('y');
            }
        }
    }

    function createBalls(numberOfBalls) {
        // Start from an empty array
        ballArray = [];

        for (var i = 0; i < numberOfBalls; i++) {
            // Create a ball with random position and speed. 
            // You can change the radius
            var ball = new Ball(w * Math.random(),
                    h * Math.random(),
                    (2 * Math.PI) * Math.random(),
                    (100),
                    30);
// * Math.random() pour la vitesse a remettre 4eme parametre Ball()
            // Do not create a ball on the player. We augmented the ball radius 
            // to sure the ball is created far from the monster. 
            if (!circRectsOverlap(monster.x, monster.y,
                    monster.width, monster.height,
                    ball.x, ball.y, ball.radius * 3) && !circRectsOverlap(target.x, target.y,
                    target.width, target.height,
                    ball.x, ball.y, ball.radius * 3)) {
                // Add it to the array
                ballArray[i] = ball;
            } else {
                i--;
            }

            


        }
    }

    function loadAssets(callback) {
        // here we should load the souds, the sprite sheets etc.
        // then at the end call the callback function

        // simple example that loads a sound and then calls the callback. We used the howler.js WebAudio lib here.
        // Load sounds asynchronously using howler.js
        plopSound = new Howl({
            urls: ['http://mainline.i3s.unice.fr/mooc/plop.mp3'],
            autoplay: false,
            volume: 1,
            onload: function () {
                console.log("all sounds loaded");
                // We're done!
                callback();
            }
        });
    }
    var start = function () {
        initFPSCounter();

        // Canvas, context etc.
        canvas = document.querySelector("#myCanvas");

        // often useful
        w = canvas.width;
        h = canvas.height;

        // important, we will draw with this object
        ctx = canvas.getContext('2d');
        // default police for text
        ctx.font = "20px Arial";

        // Create the different key and mouse listeners
        addListeners(inputStates, canvas);

        // We create tge balls: try to change the parameter
        createBalls(nbBalls);

        loadAssets(function () {
            // all assets (images, sounds) loaded, we can start the animation
            requestAnimationFrame(mainLoop);
        });
    };

    //our GameFramework returns a public API visible from outside its scope
    return {
        start: start
    };
};