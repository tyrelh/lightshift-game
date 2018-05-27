function GUI(layer) {
    this.health = new Health();

    // add to draw layer
    layer.children.push(this);

    this.update = function() {
        this.health.update();
    }

    this.draw = function() {
        this.health.draw();
    }
}

function Health() {
    this.health_text = "HEALTH";
    this.health_amount = 100;
    this.x = width / 70;
    this.y = height / 17;
    this.text_size = height / 15;
    this.bar_w = width / 5;
    this.bar_h = height / 20;

    this.update = function() {
        this.health_amount = ship.health;
    }

    this.draw = function() {
        // draw text
        push();
            fill(MAIN_COLOR);
            textSize(this.text_size);
            textFont(MAIN_FONT);
            text(this.health_text, this.x+1, this.y+2);
        pop();

        // draw bar bg
        push();
            fill(HEALTH_BG_COLOR);
            noStroke();
            rect(this.x, this.y, this.bar_w, this.bar_h);
        pop();

        // draw bar foreground
        push();
            fill(MAIN_COLOR);
            noStroke();
            rect(this.x, this.y , map(this.health_amount, 0, 100, 0, this.bar_w), this.bar_h);
        pop();
    }
}