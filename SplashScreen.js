
function SplashScreen(layer) {
    this.title = new Title();
    this.start_text = new StartText();
    // add to draw layer
    layer.children.push(this);
    
    this.update = function() {
        this.title.update();
        this.start_text.update();
    }

    this.draw = function() {
        this.title.draw();
        this.start_text.draw();
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

        push();
            fill(MAIN_COLOR);
            textSize(this.text_size);
            textAlign(CENTER);
            textFont(MAIN_FONT);
            text(this.title_text, this.pos_history[4].x, this.pos_history[4].y);
        pop();
    }
}

function StartText() {
    this.title_text = "Press SPACE to play";
    this.text_size = width / 20;
    this.pos = createVector(width / 2, (height / 10) * 8);
    //this.pos_history = [];
    this.x = width / 2;
    this.y = (height / 2) + 2;

    this.update = function() {

    }

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