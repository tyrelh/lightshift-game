
function DeadScreen(layer) {
    this.game_over_text = new GameOverText();
    this.high_score_text = new HighScoreText();
    this.restart_text = new RestartText();
    // add to draw layer
    layer.children.push(this);
    
    this.update = function() {
        this.game_over_text.update();
        this.high_score_text.update();
        this.restart_text.update();
    }
    this.draw = function() {
        this.game_over_text.draw();
        this.high_score_text.draw();
        this.restart_text.draw();
    }
}

// simply display GAME OVER
function GameOverText() {
    this.title_text = "GAME OVER";
    this.text_size = width / 10;
    this.pos = createVector(width / 2, height / 4);

    this.update = function() {}
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

// show the score of the previous game and the current highest score
function HighScoreText() {
    this.text_current = "Your score was ";
    this.text_highest = "Your high score is ";
    this.text_size = width / 20;
    this.pos_1 = createVector(width / 2, (height / 10) * 6);
    this.pos_2 = createVector(width / 2, (height / 10) * 7);

    this.update = function() {}
    this.draw = function() {
        push();
            fill(GLITCH_COLOR_1);
            textSize(this.text_size);
            textAlign(CENTER);
            textFont(MAIN_FONT);
            text(this.text_current + game.getScore(), this.pos_1.x, this.pos_1.y);
        // pop();
        // push();
            fill(GLITCH_COLOR_1);
            // textSize(this.text_size);
            // textAlign(CENTER);
            // textFont(MAIN_FONT);
            text(this.text_highest + game.getHighScore(), this.pos_2.x, this.pos_2.y);
        pop();
    }
}

// instruction to replay the game
function RestartText() {
    this.title_text = "Press SPACE to restart";
    this.text_size = width / 30;
    this.pos = createVector(width / 2, (height / 10) * 9);

    this.update = function() {}
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