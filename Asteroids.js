
function Asteroids(layer) {
    this.asteroids = [];
    this.asteroid_explosions = [];
    this.min_asteroids = game.getDifficulty();
    for (var i = 0; i < this.min_asteroids; i++) {
        this.asteroids.push(new Asteroid());
    }
    // add to draw layer
    layer.children.push(this);

    // create new asteroid
    this.newAsteroid = function() {this.asteroids.push(new Asteroid());}
    // create new explosion animation
    this.newExplosion = function(location, size) {
        this.asteroid_explosions.push(new AsteroidExplosion(location, size))
    }
    this.removeAsteroid = function(index) {
        asteroids.newExplosion(this.asteroids[index].pos, this.asteroids[index].r);
        this.asteroids.splice(index,1);
    }
    this.draw = function() {
        let i;
        for (i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].draw();
        }
        for (i = this.asteroid_explosions.length -1; i >= 0; i--) {
            let b = this.asteroid_explosions[i].draw();
            if (b != 1) {
                console.log(this.asteroid_explosions[i]);
                this.asteroid_explosions.splice(i,1);
            }
        }
    }
    this.update = function() {
        let i;
        for (i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].update();
        }
        for (i = 0; i < this.asteroid_explosions.length; i++) {
            this.asteroid_explosions[i].update();
        }
        this.min_asteroids = game.getDifficulty();
        if (this.asteroids.length < this.min_asteroids) {
            this.asteroids.push(new Asteroid());
        }
    }
    // reset asteroids
    this.reset = function() {
        this.min_asteroids = game.getDifficulty();
        this.asteroids.length = 0;
        for (var i = 0; i < this.min_asteroids; i++) {
            this.asteroids.push(new Asteroid());
        }
    }
}

function Asteroid(prev_pos, size) {
    // set size
    if (size) {
        this.r = size * 0.5;
    } else {
        this.r = Math.floor((Math.random() * 30) + 20);
    }
    // set start point
    if (prev_pos) {
        // breaking apart, so use previous position
        this.pos = prev_pos.copy();
    } else {
        // new asteroid, so pick new location
        this.pos = chooseEdgeLocation(this.r);
    }
    // direction
    this.v = p5.Vector.random2D();
    // velocity
    this.v = this.v.add((Math.random() - 0.5) * 7)
    // random information for the shape of the asteroid
    this.num_jags = Math.floor((Math.random() * 10) + 5)
    this.jags = [];
    for (var i = 0; i < this.num_jags; i++) {
        this.jags[i] = (Math.floor((Math.random() * (this.r * 0.5)) - (this.r * 0.25)));
    }
    // previous location states for glitch effect
    // this.pos_history = []
    // for (var i = 0; i < 10; i++) {
    //     this.pos_history.push(this.pos);
    // }
    // sprite
    this.sprite_x = [];
    this.sprite_y = [];
    for (var i = 0; i < this.num_jags; i++) {
        var angle = map(i, 0, this.num_jags, 0, TWO_PI);
        var x = (this.r + this.jags[i]) * cos(angle);
        var y = (this.r + this.jags[i]) * sin(angle);
        this.sprite_x.push(x);
        this.sprite_y.push(y);
    }
    // color shift amounts
    this.white_shift = this.v.copy();
    this.white_shift = this.white_shift.mult(0.8);
    this.green_shift = this.v.copy();
    this.green_shift = this.green_shift.mult(0.8);
    this.blue_shift = this.v.copy();
    this.blue_shift = this.blue_shift.mult(-3*0.8);
    // split asteroid into two smaller asteroids at same position
    this.breakup = function() {
        asteroids.asteroids.push(new Asteroid(this.pos, this.r));
        asteroids.asteroids.push(new Asteroid(this.pos, this.r));
    }
    this.draw = function() {
        let i;
            push();
                translate(this.pos.x, this.pos.y);
                // noStroke();
                fill(GLITCH_COLOR_1);
                blendMode(ADD);
                beginShape();
                for (i = 0; i < this.num_jags; i++) {
                    vertex(this.sprite_x[i], this.sprite_y[i]);
                }
                endShape(CLOSE);

                translate(this.blue_shift.x, this.blue_shift.y);
                fill(GLITCH_COLOR_3);
                beginShape();
                for (i = 0; i < this.num_jags; i++) {
                    vertex(this.sprite_x[i], this.sprite_y[i]);
                }
                endShape(CLOSE);

                translate(this.green_shift.x, this.green_shift.y);
                fill(GLITCH_COLOR_2);
                beginShape();
                for (i = 0; i < this.num_jags; i++) {
                    vertex(this.sprite_x[i], this.sprite_y[i]);
                }
                endShape(CLOSE);

                translate(this.white_shift.x, this.white_shift.y);
                blendMode(BLEND);
                fill(MAIN_COLOR);
                beginShape();
                for (i = 0; i < this.num_jags; i++) {
                    vertex(this.sprite_x[i], this.sprite_y[i]);
                }
                endShape(CLOSE);
            pop();
        // }
    }
    this.update = function() {
        this.pos.add(this.v);
        this.checkEdges();
        //this.pos_history.unshift(this.pos.copy());
        //this.pos_history.splice(-1,1);
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
}

function chooseEdgeLocation(r) {
    let edge = Math.floor(Math.random() * 2);
    let x,y;
    if (edge == 0) {
        x = width + r;
        y = Math.floor(Math.random() * height);
    } else if (edge == 1) {
        x = Math.floor(Math.random() * width);
        y = height + r;
    }
    return createVector(x,y);
}

// explosion animation that comes after an asteroid explodes
function AsteroidExplosion(location, size) {
    this.animation_frame = -1;
    this.animation_rate = 1;
    this.pos = location.copy();
    this.r = size * 2.2;
    this.r_1 = this.r + 10;
    this.r_2 = this.r + 25;
    this.r_3 = this.r + 40;
    this.r_4 = this.r + 50;

    this.update = function() {
        this.animation_frame++;
    }
    this.draw = function() {
        push()
        if (this.animation_frame < 1) {
            console.log("got to first if " + this.animation_frame);
            // disk
            fill(GLITCH_COLOR_1);
            noStroke()
            ellipse(this.pos.x, this.pos.y, this.r);
        } 
        else if (this.animation_frame < 2 * this.animation_rate) {
            console.log("got to second if");
            // disk
            fill(MAIN_COLOR);
            noStroke();
            ellipse(this.pos.x, this.pos.y, this.r);
            // ring 1
            noFill();
            stroke(GLITCH_COLOR_1);
            strokeWeight(6);
            ellipse(this.pos.x, this.pos.y, this.r_1);
        }
        else if (this.animation_frame < 3 * this.animation_rate) {
            console.log("got to third if");
            // disk
            fill(GLITCH_COLOR_2);
            noStroke();
            ellipse(this.pos.x, this.pos.y, this.r);
            // ring 1
            noFill();
            stroke(MAIN_COLOR);
            strokeWeight(6);
            ellipse(this.pos.x, this.pos.y, this.r_1);
            // ring 2
            stroke(GLITCH_COLOR_1);
            strokeWeight(3);
            ellipse(this.pos.x, this.pos.y, this.r_2);
        }
        else if (this.animation_frame < 4 * this.animation_rate) {
            console.log("got to fourth if");
            // disk
            fill(GLITCH_COLOR_3);
            noStroke();
            ellipse(this.pos.x, this.pos.y, this.r);
            // ring 1
            noFill();
            stroke(GLITCH_COLOR_2);
            strokeWeight(6);
            ellipse(this.pos.x, this.pos.y, this.r_1);
            // ring 2
            stroke(MAIN_COLOR);
            strokeWeight(3);
            ellipse(this.pos.x, this.pos.y, this.r_2);
            // ring 3
            stroke(GLITCH_COLOR_1);
            strokeWeight(2);
            ellipse(this.pos.x, this.pos.y, this.r_3);
        } else if (this.animation_frame < 5 * this.animation_rate) {
            console.log("got to fifth if");
            // ring 1
            noFill();
            stroke(GLITCH_COLOR_3);
            strokeWeight(6);
            ellipse(this.pos.x, this.pos.y, this.r_1);
            // ring 2
            stroke(GLITCH_COLOR_2);
            strokeWeight(3);
            ellipse(this.pos.x, this.pos.y, this.r_2);
            // ring 3
            stroke(MAIN_COLOR);
            strokeWeight(2);
            ellipse(this.pos.x, this.pos.y, this.r_3);
            // ring 4
            stroke(GLITCH_COLOR_1);
            strokeWeight(1);
            ellipse(this.pos.x, this.pos.y, this.r_4);
            //noLoop()
        } else if (this.animation_frame < 6 * this.animation_rate) {
            console.log("got to sixth if");
            // ring 2
            noFill();
            stroke(GLITCH_COLOR_3);
            strokeWeight(4);
            ellipse(this.pos.x, this.pos.y, this.r_2);
            // ring 3
            stroke(GLITCH_COLOR_2);
            strokeWeight(2);
            ellipse(this.pos.x, this.pos.y, this.r_3);
            // ring 4
            stroke(MAIN_COLOR);
            strokeWeight(1);
            ellipse(this.pos.x, this.pos.y, this.r_4);
        } else if (this.animation_frame < 7 * this.animation_rate) {
            console.log("got to seventh if");
            // ring 3
            noFill();
            stroke(GLITCH_COLOR_3);
            strokeWeight(2);
            ellipse(this.pos.x, this.pos.y, this.r_3);
            // ring 4
            stroke(GLITCH_COLOR_2);
            strokeWeight(1);
            ellipse(this.pos.x, this.pos.y, this.r_4);
        }
        else if (this.animation_frame < 8 * this.animation_rate) {
            console.log("got to eighth if");
            // ring 4
            noFill();
            stroke(GLITCH_COLOR_3);
            strokeWeight(1);
            ellipse(this.pos.x, this.pos.y, this.r_4);
        }
        else {
            pop();
            return 0;
        }
        pop()
        return 1;
    }
    
}