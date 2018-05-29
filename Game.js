
function Game() {
    this.base_difficulty = 5;
    this.score = 0;
    this.state = "splash_screen";
    // currently increase difficulty based on current score
    this.difficulty = this.base_difficulty + (this.score / 200);
    // layers to control state of
    this.splash_layers = [];
    this.game_layers = [];
    this.game_over_layers = [];
    this.wtf_layers = [];

    this.update = function() {
        let i;
        if (this.state == "in_progress") {
            for (i = 0; i < this.game_layers.length; i++) {
                this.game_layers[i].update();
            }
        } else if (this.state == "splash_screen") {
            for (i = 0; i < this.splash_layers.length; i++) {
                this.splash_layers[i].update();
            }
        } else if (this.state == "game_over") {
            for (i = 0; i < this.game_over_layers.length; i++) {
                this.game_over_layers[i].update();
            }
        }
    }
    this.draw = function() {
        let i;
        if (this.state == "in_progress") {
            for (i = 0; i < this.game_layers.length; i++) {
                this.game_layers[i].draw();
            }
        } else if (this.state == "splash_screen") {
            for (i = 0; i < this.splash_layers.length; i++) {
                this.splash_layers[i].draw();
            }
        } else if (this.state == "game_over") {
            for (i = 0; i < this.game_over_layers.length; i++) {
                this.game_over_layers[i].draw();
            }
        }
    }
    this.increaseScore = function(amount) {this.score += amount;}
    // start the splash screen
    this.startSplash = function() {
        let i;
        for (i = 0; i < this.game_layers.length; i++) {
            this.game_layers[i].setVisible(false);
            this.game_layers[i].setUpdate(false);
        }
        for (i = 0; i < this.game_over_layers.length; i++) {
            this.game_over_layers[i].setVisible(false);
            this.game_over_layers[i].setUpdate(false);
        }
        for (i = 0; i < this.splash_layers.length; i++) {
            this.splash_layers[i].setVisible(true);
            this.splash_layers[i].setUpdate(true);
        }
    }
    // reset and start the game
    this.startGame = function() {
        let i;
        // if coming from the game over state, clear game over layers
        if (this.state == "game_over") {
            this.state = "in_progress";
            this.score = 0;
            // TODO MAKE BETTER \/
            ship.reset();
            asteroids.reset();
            // TODO MAKE BETTER /\
            for (i = 0; i < this.game_over_layers.length; i++) {
                this.game_over_layers[i].setVisible(false);
                this.game_over_layers[i].setUpdate(false);
            }
        }
        // otherwise probably coming from splash screen
        else {
            this.state = "in_progress";
            this.score = 0;
            for (i = 0; i < this.splash_layers.length; i++) {
                this.splash_layers[i].setVisible(false);
                this.splash_layers[i].setUpdate(false);
            }
        }
        // start game
        for (i = 0; i < this.game_layers.length; i++) {
            this.game_layers[i].setVisible(true);
            this.game_layers[i].setUpdate(true);
        }
    }
    // end the game
    this.endGame = function() {
        this.state = "game_over";
        let i;
        for (i = 0; i < this.game_layers.length; i++) {
            this.game_layers[i].setVisible(false);
            this.game_layers[i].setUpdate(false);
        }
        for (i = 0; i < this.game_over_layers.length; i++) {
            this.game_over_layers[i].setVisible(true);
            this.game_over_layers[i].setUpdate(true);
        }
    }
    // getters
    this.getDifficulty = function() {return this.base_difficulty + Math.floor((this.score / 100));}
    this.getScore = function() {return this.score;}
    this.getState = function() {return this.state;}
    this.trackNewLayer = function(layer, state) {
        if (state == "game") {
            this.game_layers.push(layer);
        } else if (state == "splash") {
            this.splash_layers.push(layer);
        } else if (state == "game_over") {
            this.game_over_layers.push(layer);
        } else {
            this.wtf_layers.push(layer);
        }
    }
}

// input
function keyPressed() {
    //console.log(keypressed);
    if (keyCode === 32) {
        if (game.getState() == "splash_screen" || game.getState() == "game_over") {
            game.startGame();
        }
    }
    if (keyCode === CONTROL) {
        if (game.getState() == "in_progress") {
            ship.jump();
        }
    }
}