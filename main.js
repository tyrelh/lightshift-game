var layer_1;
var layer_2;
var ship;
var asteroids;
var lasers;


function setup() {
    // inital canvas setup
    createCanvas(window.innerWidth, window.innerHeight);
    background(20,20,22);
    // layers
    layer_gui = new ObjectLayer();
    layer_1 = new ObjectLayer();
    layer_2 = new ObjectLayer();
    // game objects
    asteroids = new Asteroids(layer_2);
    lasers = new Lasers(layer_2);
    ship = new Ship(layer_1,"moveState");
    gui = new GUI(layer_gui);
}

function draw() {
    update(); // game logic
    staticRender();
    render();
}



// game logic update
function update() {
    layer_2.update();
    layer_1.update();
    layer_gui.update();

}

function render() {
    layer_2.draw();
    layer_1.draw();
    layer_gui.draw();
}

function staticRender() {
    background(2,2,4);
}