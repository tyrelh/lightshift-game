
function ObjectLayer() {
    this.children = [];
    this.visible = true;
    this.update_check = true;

    this.draw = function() {
        if (this.visible) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].draw();
            }
        }
    }

    this.update = function() {
        if (this.update_check) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].update();
            }
        }
    }
}