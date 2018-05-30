
function SplashScreen(layer) {
    this.title = new Title();
    this.start_text = new StartText();
    this.blurb = new Blurb();
    this.instructions = new Instructions();
    // add to draw layer
    layer.children.push(this);
    
    this.update = function() {
        this.title.update();
        //this.start_text.update();
        //this.blurb.update();
        //this.intructions.update();
    }

    this.draw = function() {
        this.title.draw();
        this.start_text.draw();
        this.blurb.draw();
        this.instructions.draw();
    }
}

function Title() {
    this.title_text = "LIGHTSHIFT";
    this.text_size = width / 5;
    this.pos = createVector(width / 2, height / 2);
    this.pos_history = [];
    this.x = width / 2;
    this.y = (height / 2) + 2;
    this.x_speed = 0.5;
    this.y_speed = 0.5;
    this.x_lower_bound = this.x - 12;
    this.x_upper_bound = this.x + 12;
    this.y_lower_bound = this.y - 8;
    this.y_upper_bound = this.y + 8;

    for (var i = 0; i < 18; i++) {
        this.pos_history.push(this.pos);
    }

    this.update = function() {
        // update pos history
        this.pos_history.unshift(this.pos.copy());
        this.pos_history.splice(-1,1);
        //bouncing horizontally
 	    this.pos.x += this.x_speed;
        if (this.pos.x > this.x_upper_bound || this.pos.x < this.x_lower_bound)  {
            this.x_speed = -this.x_speed;
        }
        //bouncing veritcally
        this.pos.y += this.y_speed;
        if (this.pos.y > this.y_upper_bound || this.pos.y < this.y_lower_bound) {
            this.y_speed = -this.y_speed;
        }
    }

    this.draw = function() {
        // draw glitch effect
        push();
            fill(GLITCH_COLOR_1);
            textSize(this.text_size);
            blendMode(ADD)
            textAlign(CENTER);
            textFont(MAIN_FONT);
            text(this.title_text, this.pos_history[0].x, this.pos_history[0].y);
        pop();
        push();
            fill(GLITCH_COLOR_3);
            textSize(this.text_size);
            blendMode(ADD);
            textAlign(CENTER);
            textFont(MAIN_FONT);
            text(this.title_text, this.pos_history[12].x, this.pos_history[12].y);
        pop();
        push();
            fill(GLITCH_COLOR_2);
            textSize(this.text_size);
            blendMode(ADD);
            textAlign(CENTER);
            textFont(MAIN_FONT);
            text(this.title_text, this.pos_history[8].x, this.pos_history[8].y);
        pop();
        // draw main text
        push();
            fill(MAIN_COLOR);
            textSize(this.text_size);
            textAlign(CENTER);
            textFont(MAIN_FONT);
            text(this.title_text, this.pos_history[4].x, this.pos_history[4].y);
        pop();
    }
}

// text telling player how to begin the game
function StartText() {
    this.title_text = "Press SPACE to play";
    this.text_size = width / 18;
    this.pos = createVector(width / 2, (height / 10) * 8);

    this.update = function() {}
    this.draw = function() {
        push();
            fill(MAIN_COLOR);
            textSize(this.text_size);
            textAlign(CENTER);
            textFont(MAIN_FONT);
            text(this.title_text, this.pos.x, this.pos.y);
        pop();
    }
}

// blurb about game
function Blurb() {
    this.title_text = "a game created by tyrel hiebert";
    this.text_size = width / 40;
    this.pos = createVector(width / 2, (height / 10) * 9.5);

    this.update = function() {}
    this.draw = function() {
        push();
            fill(MAIN_COLOR);
            textSize(this.text_size);
            textAlign(CENTER);
            textFont(MAIN_FONT);
            text(this.title_text, this.pos.x, this.pos.y);
        pop();
    }
}

// instructions on how to play
function Instructions() {
    this.text = "Left/Right = Turn\nUp = Boost\nDown = Retroboost\nShift = Laser\nControl = Jump";
    this.text_size = width / 55;
    this.pos = createVector(width - (width / 40), height - (height / 5));

    this.update = function() {}
    this.draw = function() {
        push();
            fill("#FFFFFF44");
            textSize(this.text_size);
            textAlign(RIGHT);
            textFont(MAIN_FONT);
            text(this.text, this.pos.x, this.pos.y);
        pop();
    }
}