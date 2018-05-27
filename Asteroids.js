
function Asteroids(layer) {
    this.asteroids = [];

    for (var i = 0; i < 5; i++) {
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
        if (this.asteroids.length < 5) {
            this.asteroids.push(new Asteroid());
        }
    }
}


function Asteroid(prev_pos, size) {
    this.visible = true;
    if (prev_pos) {
        this.pos = prev_pos.copy();
    } else {
        this.pos = createVector(
            Math.floor((Math.random() * width) + 1),
            Math.floor((Math.random() * height) + 1)
        );
    }
    if (size) {
        this.r = size * 0.5;
    } else {
        this.r = Math.floor((Math.random() * 30) + 20);
    }
    this.v = p5.Vector.random2D();
    this.v = this.v.mult(Math.random()+1)
    this.num_jags = Math.floor((Math.random() * 10) + 5)
    this.jags = [];
    for (var i = 0; i < this.num_jags; i++) {
        this.jags[i] = (Math.floor((Math.random() * (this.r * 0.5)) - (this.r * 0.25)));
    }
    this.pos_history = []
    for (var i = 0; i < 10; i++) {
        this.pos_history.push(this.pos);
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
            translate(this.pos_history[2], this.pos_history[2].y);
            noStroke();
            fill(color(0, 0, 255, 200));
            beginShape();
            for (var i = 0; i < this.num_jags; i++) {
                var angle = map(i, 0, this.num_jags, 0, TWO_PI);
                var x = (this.r + this.jags[i]) * cos(angle);
                var y = (this.r + this.jags[i]) * sin(angle);
                vertex(x, y);
            }
            endShape(CLOSE);
            pop();

            push();
            translate(this.pos_history[1], this.pos_history[1].y);
            noStroke();
            fill(color(255, 0, 0, 200));
            beginShape();
            for (var i = 0; i < this.num_jags; i++) {
                var angle = map(i, 0, this.num_jags, 0, TWO_PI);
                var x = (this.r + this.jags[i]) * cos(angle);
                var y = (this.r + this.jags[i]) * sin(angle);
                vertex(x, y);
            }
            endShape(CLOSE);
            pop();

            push();
            translate(this.pos.x, this.pos.y);
            noStroke();
            fill(255);
            beginShape();
            for (var i = 0; i < this.num_jags; i++) {
                var angle = map(i, 0, this.num_jags, 0, TWO_PI);
                var x = (this.r + this.jags[i]) * cos(angle);
                var y = (this.r + this.jags[i]) * sin(angle);
                vertex(x, y);
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