// constructor function for balls
    function Ball(x, y, angle, v, diameter) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.v = v;
        this.radius = 25;
        this.color = 'black';

        this.draw = function (ctx) {
            ctx.save();
            ctx.fillStyle="#FF4422";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        };

        this.move = function () {
            // add horizontal increment to the x pos
            // add vertical increment to the y pos

            var incX = this.v * Math.cos(this.angle);
            var incY = this.v * Math.sin(this.angle);
            //var incX = this.v * Math.PI;
            //var incY = this.v * Math.PI;

            this.x += calcDistanceToMove(delta, incX);
            this.y += calcDistanceToMove(delta, incY);
        };
    }
