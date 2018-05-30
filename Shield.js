function Shields(layer) {
    this.num_shields = 0;
    this.shields = [];
    //this.shield_drops = [];
    // TEMP \/
    //this.shield_drops.push(new ShieldDrop());
    // add to draw layer
    layer.children.push(this);

    // create and add a new shield
    this.newShield = function() {
        if (this.shields.length < 1) {
            this.shields.push(new Shield());
            this.num_shields++;
        }
    }
    this.pickUpShieldDrop = function() {

    }
    this.checkShields = function() {
        if (this.shields.length > 0) {
            this.popShield();
            return true;
        }
        return false;
    }
    // clear shields
    this.popShield = function() {
        if (this.shields.length >= 1) {
            this.shields.length = 0;
        }
    }
    this.update = function() {
        let i;
        for (i = 0; i < this.shields.length; i++) {
            this.shields[i].update();
        }
        
    }
    this.draw = function() {
        for (let i = 0; i < this.shields.length; i++) {
            this.shields[i].draw();
        }
        
    }
    // getters
    this.getNumShields = function() {return this.num_shields;}
}

function Shield() {
    // get position from ship
    this.pos = ship.getPos();
    // track position history for glitch effect
    this.pos_history = [];
    for (var i = 0; i < 4; i++) {
        this.pos_history.push(this.pos);
    }
    // size of shield
    this.r = 55;
    this.thickness = 4;

    this.update = function() {
        // update the current position of ship
        this.pos = ship.getPos();
        // update position history
        this.pos_history.unshift(this.pos.copy());
        this.pos_history.splice(-1,1);
    }
    this.draw = function() {
        // draw glitch effect
        push();
            stroke(GLITCH_COLOR_1);
            strokeWeight(this.thickness);
            blendMode(ADD);
            noFill()
            ellipse(this.pos.x, this.pos.y, this.r);
        pop();
        push();
            stroke(GLITCH_COLOR_3);
            strokeWeight(this.thickness);
            blendMode(ADD);
            noFill()
            ellipse(this.pos_history[3].x, this.pos_history[3].y, this.r);
        pop();
        push();
            stroke(GLITCH_COLOR_2);
            strokeWeight(this.thickness);
            blendMode(ADD);
            noFill()
            ellipse(this.pos_history[2].x, this.pos_history[2].y, this.r);
        pop();
        // draw shield
        push();
            stroke(MAIN_COLOR);
            strokeWeight(this.thickness);
            noFill()
            ellipse(this.pos_history[1].x, this.pos_history[1].y, this.r);
        pop();
    }
}

function ShieldDrop(location) {
    this.pos = location.copy();
    this.r = 20;

    this.update = function() {

    }
    this.draw = function() {
        push()
            fill(GLITCH_COLOR_2);
            noStroke();
            blendMode(ADD);
            rect(this.pos.x, this.pos.y, this.r, this.r);
        pop()
    }
    // check for collosion with ship
    this.hits = function(ship) {
        let d = calcDist(this.pos, ship.pos);
        if (d < ship.r + this.r) {
            return true;
        }
        return false;
    }
    // pick up shield drop
    this.pickUp = function() {

    }
}