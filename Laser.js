
var fire_rate = 10;

function Lasers(layer) {
    this.lasers = [];
    this.prev_laser = 0;
    this.visible = true;
    this.update_check = true;

    // add to draw layer
    layer.children.push(this);

    this.newLaser = function() {
        this.lasers.push(new Laser(ship.pos, ship.direction));
    }

    this.draw = function() {
        if (this.visible) {
            for (var i = 0; i < this.lasers.length; i++) {
                this.lasers[i].draw();
            }
        }
    }

    this.update = function() {
        if (this.update_check) {
            if (keyIsDown(SHIFT)) {
                if (frameCount - this.prev_laser > fire_rate) {
                    this.newLaser(ship.pos, ship.direction);
                    this.prev_laser = frameCount;
                }
            }
            for (var i = this.lasers.length - 1; i >= 0; i--) {
                this.lasers[i].update();
                this.lasers[i].checkEdges();
                if (this.lasers[i].spent) {
                    this.lasers.splice(i,1);
                }
            }
        }
    }
}


function Laser(start, angle) {
    this.pos = createVector(start.x, start.y);
    this.v = p5.Vector.fromAngle(angle);
    this.v.mult(9);
    this.spent = false;
    this.r = 6;
    this.pos_history = []
    for (var i = 0; i < 4; i++) {
        this.pos_history.push(this.pos);
    }
    LASER_SOUND_1.setVolume(0.5);
    LASER_SOUND_1.play()

    this.draw = function() {

        push();
        stroke(GLITCH_COLOR_1);
        strokeWeight(this.r);
        point(this.pos_history[0].x, this.pos_history[0].y);
        pop();

        push();
        stroke(GLITCH_COLOR_3);
        strokeWeight(this.r);
        point(this.pos_history[3].x, this.pos_history[3].y);
        pop();

        push();
        stroke(GLITCH_COLOR_2);
        strokeWeight(this.r);
        point(this.pos_history[2].x, this.pos_history[2].y);
        pop();

        push();
        stroke(MAIN_COLOR);
        strokeWeight(this.r);
        point(this.pos_history[1].x, this.pos_history[1].y);
        pop();
    }

    this.update = function() {
        this.pos.add(this.v)
        for (var i = asteroids.asteroids.length - 1; i >= 0; i--) {
            if (this.hits(asteroids.asteroids[i])) {
                if (asteroids.asteroids[i].r > 15) {
                    var new_asteroids = asteroids.asteroids[i].breakup();
                    asteroids.asteroids.push(new_asteroids[0]);
                    asteroids.asteroids.push(new_asteroids[1]);
                }
                gui.score.score += Math.floor(asteroids.asteroids[i].r);
                asteroids.asteroids.splice(i,1);
                this.spent = true;
                break;
            }
        }
        this.pos_history.unshift(this.pos.copy());
        this.pos_history.splice(-1,1);
    }

    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < asteroid.r) {
            return true;
        }
        return false;
    }

    this.checkEdges = function() {
        if (this.pos.x > width + this.r) {
            this.spent = true;
        } else if (this.pos.x < -this.r) {
            this.spent = true;
        }
        if (this.pos.y > height + this.r) {
            this.spent = true;
        } else if (this.pos.y < -this.r) {
            this.spent = true;
        }
        // if (this.pos.x > width + this.r) {
        //     this.pos.x = -this.r;
        // } else if (this.pos.x < -this.r) {
        //     this.pos.x = width + this.r;
        // }
        // if (this.pos.y > height + this.r) {
        //     this.pos.y = -this.r;
        // } else if (this.pos.y < -this.r) {
        //     this.pos.y = height + this.r;
        // }
    }
}