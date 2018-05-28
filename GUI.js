function GUI(layer) {
    this.health = new Health();
    this.score = new Score();
    this.frame_rate = new FrameRate();
    //this.mute_button = new MuteButton();
    this.visible = true;
    this.update_check = true;

    // add to draw layer
    layer.children.push(this);

    this.update = function() {
        if (this.update_check) {
            this.health.update();
            this.score.update();
            this.frame_rate.update();
            //this.mute_button.update();
        }
    }

    this.draw = function() {
        if (this.visible) {
            this.health.draw();
            this.score.draw();
            this.frame_rate.draw();
            //this.mute_button.draw();
        }
    }
}

// function MuteButton() {
//     this.update = function() {

//     }

//     this.draw = function() {

//     }
// }

function FrameRate() {
    this.frame_rate = 0;
    this.text_size = height / 15;
    this.x = (width / 70) * 69;
    this.y = (height / 11) * 10;

    this.update = function() {
        if (frameCount % 8 == 0) {
            this.frame_rate = Math.floor(frameRate());
        }
    }

    this.draw = function() {
        push();
            fill(MAIN_COLOR);
            textSize(this.text_size+1);
            textAlign(RIGHT);
            textFont(MAIN_FONT);
            text(this.frame_rate, this.x+1, this.y+1);
        pop();
    }
}

function Score() {
    this.text_size = height / 10;
    this.x = (width / 70) * 69;
    this.y = height / 11;
    this.score = 0;
    this.score_history = [];
    for (let i = 0; i < 10; i++) {
        this.score_history.push(this.score);
    }

    this.update = function() {
        // update history
        this.score_history.unshift(this.score);
        this.score_history.splice(-1,1);
    }

    this.draw = function() {

        push();
            fill(GLITCH_COLOR_1);
            textSize(this.text_size);
            textAlign(RIGHT);
            textFont(MAIN_FONT);
            text(this.score_history[0], this.x+1, this.y+1);
        pop();

        push();
            fill(GLITCH_COLOR_3);
            textSize(this.text_size);
            textAlign(RIGHT);
            textFont(MAIN_FONT);
            text(this.score_history[6], this.x+1, this.y+1);
        pop();

        push();
            fill(GLITCH_COLOR_2);
            textSize(this.text_size);
            textAlign(RIGHT);
            textFont(MAIN_FONT);
            text(this.score_history[4], this.x+1, this.y+1);
        pop();

        // draw foreground text
        push();
            fill(MAIN_COLOR);
            textSize(this.text_size+1);
            textAlign(RIGHT);
            textFont(MAIN_FONT);
            text(this.score_history[2], this.x+1, this.y+1);
        pop();
    }
}

function Health() {
    this.health_text = "HEALTH";
    this.health_amount = 100;
    this.health_history = []
    for (var i = 0; i < 10; i++) {
        this.health_history.push(this.health_amount);
    }
    this.x = width / 70;
    this.y = height / 17;
    this.text_size = height / 15;
    this.bar_w = width / 5;
    this.bar_h = height / 20;

    this.update = function() {
        this.health_amount = ship.health;
        // update history
        this.health_history.unshift(this.health_amount);
        this.health_history.splice(-1,1);
    }

    this.draw = function() {
        // draw text
        push();
            fill(MAIN_COLOR);
            textSize(this.text_size);
            textFont(MAIN_FONT);
            text(this.health_text, this.x+1, this.y+1);
        pop();

        // draw bar bg
        push();
            fill(HEALTH_BG_COLOR);
            noStroke();
            rect(this.x, this.y, this.bar_w, this.bar_h);
        pop();

        // draw bar foreground
        push();
            fill(GLITCH_COLOR_3);
            noStroke();
            rect(this.x, this.y , map(this.health_history[8], 0, 100, 0, this.bar_w), this.bar_h);
        pop();
        push();
            fill(GLITCH_COLOR_2);
            noStroke();
            rect(this.x, this.y , map(this.health_history[4], 0, 100, 0, this.bar_w), this.bar_h);
        pop();
        push();
            fill(MAIN_COLOR);
            noStroke();
            rect(this.x-1, this.y-1, map(this.health_amount, 0, 100, 0, this.bar_w)+2, this.bar_h+2);
        pop();
    }
}