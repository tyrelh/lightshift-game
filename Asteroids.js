
var initial_asteroids = 1;
var min_asteroids = 5;

function Asteroids(layer) {
    this.asteroids = [];
    this.visible = true;
    this.update_check = true;

    for (var i = 0; i < initial_asteroids; i++) {
        this.asteroids.push(new Asteroid());
    }

    // add to draw layer
    layer.children.push(this);

    this.newAsteroid = function() {
        this.asteroids.push(new Asteroid());
    }

    this.draw = function() {
        for (var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].draw();
        }
    }

    this.update = function() {
        for (var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].update();
        }
        if (this.asteroids.length < min_asteroids) {
            this.asteroids.push(new Asteroid());
        }
    }
}


function Asteroid(prev_pos, size) {
    this.visible = true;
    // set start point
    if (prev_pos) {
        this.pos = prev_pos.copy();
    } else {
        this.pos = createVector(
            Math.floor((Math.random() * width) + 1),
            Math.floor((Math.random() * height) + 1)
        );
    }
    // set size
    if (size) {
        this.r = size * 0.5;
    } else {
        this.r = Math.floor((Math.random() * 30) + 20);
    }
    // direction
    this.v = p5.Vector.random2D();
    // velocity
    this.v = this.v.add(Math.random()+2)
    // random information for the shape of the asteroid
    this.num_jags = Math.floor((Math.random() * 10) + 5)
    this.jags = [];
    for (var i = 0; i < this.num_jags; i++) {
        this.jags[i] = (Math.floor((Math.random() * (this.r * 0.5)) - (this.r * 0.25)));
    }
    // previous location states for glitch effect
    this.pos_history = []
    for (var i = 0; i < 10; i++) {
        this.pos_history.push(this.pos);
    }
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


    this.breakup = function() {
        var new_a = []
        new_a[0] = new Asteroid(this.pos, this.r);
        new_a[1] = new Asteroid(this.pos, this.r);
        return new_a;
    }

    this.draw = function() {
        if (this.visible) {
            push();
            translate(this.pos_history[0], this.pos_history[0].y);
            noStroke();
            fill(GLITCH_COLOR_1);
            //blendMode(ADD);
            //shape(this.sprite);
            beginShape();
            for (var i = 0; i < this.num_jags; i++) {
                vertex(this.sprite_x[i], this.sprite_y[i]);
            }
            endShape(CLOSE);
            pop();

            push();
            translate(this.pos_history[3], this.pos_history[3].y);
            noStroke();
            fill(GLITCH_COLOR_3);
            blendMode(ADD);
            //shape(this.sprite);
            beginShape();
            for (var i = 0; i < this.num_jags; i++) {
                vertex(this.sprite_x[i], this.sprite_y[i]);
            }
            endShape(CLOSE);
            pop();

            push();
            translate(this.pos_history[2], this.pos_history[2].y);
            noStroke();
            fill(GLITCH_COLOR_2);
            blendMode(ADD);
            // shape(this.sprite);
            beginShape();
            for (var i = 0; i < this.num_jags; i++) {
                vertex(this.sprite_x[i], this.sprite_y[i]);
            }
            endShape(CLOSE);
            pop();

            push();
            translate(this.pos_history[1], this.pos_history[1].y);
            noStroke();
            fill(MAIN_COLOR);
            // shape(this.sprite);;
            beginShape();
            for (var i = 0; i < this.num_jags; i++) {
                vertex(this.sprite_x[i], this.sprite_y[i]);
            }
            endShape(CLOSE);
            pop();
        }
    }

    this.update = function() {
        this.pos.add(this.v);
        this.checkEdges();
        this.pos_history.unshift(this.pos.copy());
        this.pos_history.splice(-1,1);
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