   // We can add the other collision functions seen in the
   // course here...
   
   // Collisions between rectangle and circle
    function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
        var testX = cx;
        var testY = cy;

        if (testX < x0)
            testX = x0;
        if (testX > (x0 + w0))
            testX = (x0 + w0);
        if (testY < y0)
            testY = y0;
        if (testY > (y0 + h0))
            testY = (y0 + h0);

        return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
    }

    


    function testCollisionWithWalls(ball, w, h) {
        // left
        if (ball.x < ball.radius) {
            ball.x = ball.radius;
            ball.angle = -ball.angle + Math.PI;
        }
        // right
        if (ball.x > w - (ball.radius)) {
            ball.x = w - (ball.radius);
            ball.angle = -ball.angle + Math.PI;
        }
        // up
        if (ball.y < ball.radius) {
            ball.y = ball.radius;
            ball.angle = -ball.angle;
        }
        // down
        if (ball.y > h - (ball.radius)) {
            ball.y = h - (ball.radius);
            ball.angle = -ball.angle;
        }
    }

    function testCollisionCarreWithWalls(carre, w, h) {
/* bloqué par les murs
        // coté haut
        if (carre.y < 0) {
            carre.y = 0;
        }

        // coté gauche
        if (carre.x < 0) {
            carre.x = 0;
        }

        // coté bas
        if (carre.y > h-carre.height) {
            carre.y = h-carre.height;
        }

        // coté droite
        if (carre.x > w-carre.width) {
            carre.x = w-carre.width;
        }*/
// test
        // coté haut
        if (carre.y < 0-carre.height) {
            carre.y = h+carre.height;
        }

        // coté gauche
        if (carre.x < 0-carre.width) {
            carre.x = w+carre.width;
        }

        // coté bas
        if (carre.y > h+carre.height) {
            carre.y = 0-carre.height;
        }

        // coté droite
        if (carre.x > w+carre.width) {
            carre.x = 0-carre.width;
        }

    }

     function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
          if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
            return false; // No horizontal axis projection overlap
          if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
            return false; // No vertical axis projection overlap
          return true;    // If previous tests failed, then both axis projections
                          // overlap and the rectangles intersect
        }
