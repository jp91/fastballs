// constructor function for balls
    function Rectangle(x, y, angle, v) {
        this.x = x;
        this.y = y;

        this.draw = function (ctx) {
            ctx.save();
            ctx.fillStyle="#FF4422";
            ctx.rect(20,20,150,100);
            ctx.fill();
            ctx.restore();
        };

        this.move = function () {
            // add horizontal increment to the x pos
            // add vertical increment to the y pos

            var incX = this.v * Math.cos(this.angle);
            var incY = this.v * Math.sin(this.angle);

            this.x += calcDistanceToMove(delta, incX);
            this.y += calcDistanceToMove(delta, incY);
        };
    }
