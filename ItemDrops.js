
function ItemDrops(layer) {
    this.num_shield_drops = 0;
    this.shield_drops = [];
    // add to draw layer
    layer.children.push(this);

    // generate a new shield drop at location
    this.newShieldDrop = function(location) {
        this.shield_drops.push(new ShieldDrop(location));
        this.num_shield_drops++;
    }

    this.update = function() {
        for (i = this.shield_drops.length - 1; i >= 0 ; i--) {
            this.shield_drops[i].update();
            if (this.shield_drops[i].hits(ship)) {
                this.shield_drops.splice(i, 1);
                shields.newShield();
            }
        }
    }
    this.draw = function() {
        for (i = 0; i < this.shield_drops.length; i++) {
            this.shield_drops[i].draw();
        }
    }
    // getters
    this.getNumShieldDrops = function() {return this.num_shield_drops;}
}