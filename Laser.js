
function Lasers(layer) {
    this.lasers = [];
    this.prev_laser = 0;

    // add to draw layer
    layer.children.push(this);

    this.newLaser = function() {this.lasers.push(new Laser(ship.pos, ship.direction));}
    this.draw = function() {
        for (var i = 0; i < this.lasers.length; i++) {
            this.lasers[i].draw();
        }
    }
    this.update = function() {
        if (keyIsDown(SHIFT)) {
            if (frameCount - this.prev_laser > FIRE_RATE) {
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

function Laser(start, angle) {
    this.pos = createVector(start.x, start.y);
    this.v = p5.Vector.fromAngle(angle);
    this.v.mult(15);
    this.spent = false;
    this.r = 6;
    this.pos_history = []
    for (var i = 0; i < 4; i++) {
        this.pos_history.push(this.pos);
    }
    //LASER_SOUND_1.setVolume(0.5);
    //LASER_SOUND_1.play()
    // color shift amounts
    this.white_shift = this.v.copy();
    this.white_shift = this.white_shift.mult(0.8);
    this.green_shift = this.v.copy();
    this.green_shift = this.green_shift.mult(0.8);
    this.blue_shift = this.v.copy();
    this.blue_shift = this.blue_shift.mult(-3*0.8);

    this.draw = function() {
        push();
            stroke(GLITCH_COLOR_1);
            strokeWeight(this.r);
            point(this.pos_history[0].x, this.pos_history[0].y);

            stroke(GLITCH_COLOR_3);
            point(this.pos_history[3].x, this.pos_history[3].y);

            stroke(GLITCH_COLOR_2);
            point(this.pos_history[2].x, this.pos_history[2].y);

            stroke(MAIN_COLOR);
            point(this.pos_history[1].x, this.pos_history[1].y);
        pop();
    }

    this.update = function() {
        this.pos.add(this.v)
        // need to check each asteroid for collision
        for (var i = asteroids.asteroids.length - 1; i >= 0; i--) {
            // if the laser hits an asteroid
            if (this.hits(asteroids.asteroids[i])) {
                // if the asteroid is above a certain size
                if (asteroids.asteroids[i].r > MIN_ASTEROID_SIZE) {
                    asteroids.asteroids[i].breakup();
                    if (Math.floor(game.getScore() / SHIELD_DROP_RATE) > item_drops.getNumShieldDrops()) {                       
                        item_drops.newShieldDrop(asteroids.asteroids[i].pos);
                    }
                }
                game.increaseScore(Math.floor(asteroids.asteroids[i].r));
                asteroids.removeAsteroid(i);
                this.spent = true;
                break;
            }
        }
        this.pos_history.unshift(this.pos.copy());
        this.pos_history.splice(-1,1);
    }

    this.hits = function(asteroid) {
        let d = calcDist(this.pos, asteroid.pos);
        if (d < asteroid.r + this.r) {
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