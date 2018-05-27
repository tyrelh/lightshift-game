var layer_1;
var layer_2;
var ship;
var asteroids;
var lasers;

function setup() {
    // inital canvas setup
    createCanvas(window.innerWidth, window.innerHeight);
    background(20,20,22);
    //blendMode(BLEND);
    // layers
    layer_1 = new ObjectLayer();
    layer_2 = new ObjectLayer();
    // game objects
    asteroids = new Asteroids(layer_2);
    lasers = new Lasers(layer_2);
    ship = new Ship(layer_1,"moveState",0.97,color(255));
}

function draw() {
    fixedUpdate(); // physics
    update(); // game logic
    lateUpdate(); // finalizing frame
    staticRender();
    render();
    
}



// physics update
function fixedUpdate() {

}

// game logic update
function update() {
    layer_2.update();
    layer_1.update();

}

// finalizing update
function lateUpdate() {

}

function render() {
    layer_2.draw();
    layer_1.draw();
}

function staticRender() {
    background(2,2,4);
}