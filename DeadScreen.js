
function DeadScreen(layer) {
    this.game_over_text = new GameOverText();
    this.restart_text = new RestartText();
    // add to draw layer
    layer.children.push(this);
    
    this.update = function() {
        this.game_over_text.update();
        this.restart_text.update();
    }

    this.draw = function() {
        this.game_over_text.draw();
        this.restart_text.draw();
    }
}

function GameOverText() {
    this.title_text = "GAME OVER";
    this.text_size = width / 10;
    this.pos = createVector(width / 2, height / 2);
    this.x = width / 2;
    this.y = (height / 2) + 2;

    this.update = function() {

    }

    this.draw = function() {

        push();
            fill(GLITCH_COLOR_1);
            textSize(this.text_size);
            textAlign(CENTER);
            textFont(MAIN_FONT);
            text(this.title_text, this.pos.x, this.pos.y);
        pop();
    }
}

function RestartText() {
    this.title_text = "Press SPACE to restart";
    this.text_size = width / 20;
    this.pos = createVector(width / 2, (height / 10) * 8);
    //this.pos_history = [];
    this.x = width / 2;
    this.y = (height / 2) + 2;

    this.update = function() {

    }

    this.draw = function() {
        push();
            fill(GLITCH_COLOR_1);
            textSize(this.text_size);
            textAlign(CENTER);
            textFont(MAIN_FONT);
            text(this.title_text, this.pos.x, this.pos.y);
        pop();
    }
}