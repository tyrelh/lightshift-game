
function Ship(layer) {
    // ship parameters
    this.r = 15;
    this.pos = createVector(width/2,height/2);
    this.pos_history = [];
    for (var i = 0; i < 4; i++) {
        this.pos_history.push(this.pos);
    }
    this.direction = 0;
    this.v = createVector(0,0);
    this.acc = 0;
    this.drag = 0.99;
    this.turn_rate = 0.13;
    this.prev_hit_frame = 0;
    this.health = 100;
    // color shift amounts
    // this.white_shift = this.v.copy();
    // this.white_shift = this.white_shift.mult(0.8);
    // this.green_shift = this.v.copy();
    // this.green_shift = this.green_shift.mult(0.8);
    // this.blue_shift = this.v.copy();
    // this.blue_shift = this.blue_shift.mult(-3*0.8);

    // add to draw layer
    layer.children.push(this);

    // draw to canvas
    this.draw = function() {
        // draw glitch effect
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.direction + HALF_PI);
            fill(GLITCH_COLOR_1);
            blendMode(ADD);
            // noStroke();
            triangle(-this.r,this.r-3,this.r,this.r-3,0,-this.r-3);
        pop();
        push();
            translate(this.pos_history[3].x, this.pos_history[3].y);
            rotate(this.direction + HALF_PI);
            fill(GLITCH_COLOR_3);
            blendMode(ADD);
            // noStroke();
            triangle(-this.r,this.r-3,this.r,this.r-3,0,-this.r-3);
        pop();
        push();
            translate(this.pos_history[2].x, this.pos_history[2].y);
            rotate(this.direction + HALF_PI);
            fill(GLITCH_COLOR_2);
            blendMode(ADD);
            // noStroke();
            triangle(-this.r,this.r-3,this.r,this.r-3,0,-this.r-3);
        pop();
        // // draw ship
        push();
            translate(this.pos_history[1].x, this.pos_history[1].y);
            rotate(this.direction + HALF_PI);
            fill(MAIN_COLOR);
            // noStroke();
            triangle(-this.r,this.r-3,this.r,this.r-3,0,-this.r-3);
        pop();
    }

    // update ship logic
    this.update = function() {
        if (keyIsDown(LEFT_ARROW)) {
            this.turn(-this.turn_rate);
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.turn(this.turn_rate);
        } if (keyIsDown(UP_ARROW)) {
            this.thrust();
        } else if (keyIsDown(DOWN_ARROW)) {
            this.deccel();
        }
        
        this.pos.add(this.v);
        this.v.mult(this.drag);
        this.checkEdges();

        this.pos_history.unshift(this.pos.copy());
        this.pos_history.splice(-1,1);
        // this.updateColorShift();

        for (let i = asteroids.asteroids.length - 1; i >= 0; i--) {
            if (this.hits(asteroids.asteroids[i])) {
                if (frameCount - this.prev_hit_frame > DAMAGE_RATE) {
                    if (!shields.checkShields()) {
                        this.health -= DAMAGE_AMOUNT;
                    }
                    this.prev_hit_frame = frameCount;
                    break;
                }
            }
        }
        this.checkHealth();
    }

    this.turn = function(angle) {this.direction += angle;}
    this.jump = function() {
        let d = p5.Vector.fromAngle(this.direction);
        d.mult(JUMP_DISTANCE);
        this.pos.add(d);
    }
    this.thrust = function() {
        this.acc = p5.Vector.fromAngle(this.direction);
        this.acc.mult(0.3);
        this.v.add(this.acc);
    }
    this.deccel = function() {
        this.acc = p5.Vector.fromAngle(this.direction);
        this.acc.mult(0.1);
        this.v.sub(this.acc);
    }
    this.hits = function(asteroid) {
        //var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        let d = calcDist(this.pos, asteroid.pos);
        if (d < asteroid.r + this.r) {
            return true;
        }
        return false;
    }
    this.checkEdges = function() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }
    this.checkHealth = function() {
        if (this.health <= 0) {game.endGame();}
    }
    this.reset = function() {
        this.pos = createVector(width/2,height/2);
        this.pos_history = [];
        for (var i = 0; i < 4; i++) {
            this.pos_history.push(this.pos);
        }
        this.prev_hit_frame = 0;
        this.direction = 0;
        this.v = createVector(0,0);
        this.acc = 0;
        this.health = 100;
    }
    // this.updateColorShift = function() {
    //     // color shift amounts
    //     this.white_shift = this.v.copy();
    //     this.white_shift = this.white_shift.mult(0.8);
    //     this.green_shift = this.v.copy();
    //     this.green_shift = this.green_shift.mult(0.8);
    //     this.blue_shift = this.v.copy();
    //     this.blue_shift = this.blue_shift.mult(-3*0.8);
    // }
    // getters
    this.getHealth = function() {return this.health;}
    this.getPos = function() {return this.pos.copy();}
}