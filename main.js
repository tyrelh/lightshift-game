var layer_ship;
var layer_roids_lasers;
var ship;
var asteroids;
var lasers;


function setup() {
    // inital canvas setup
    createCanvas(window.innerWidth, window.innerHeight);
    //createCanvas(600,400)
    background(20,20,22);
    // layers
    layer_gui = new ObjectLayer();
    layer_ship = new ObjectLayer();
    layer_roids_lasers = new ObjectLayer();
    layer_title = new ObjectLayer();
    layer_game_over = new ObjectLayer();
    // game objects
    splash_screen = new SplashScreen(layer_title);
    asteroids = new Asteroids(layer_roids_lasers);
    lasers = new Lasers(layer_roids_lasers);
    ship = new Ship(layer_ship);
    gui = new GUI(layer_gui);
    game_over = new DeadScreen(layer_game_over);
    
    // start at title screen
    setGameInvisible();

    //BG_MUSIC_1.setVolume(0.5);
    //BG_MUSIC_1.play();
}

function draw() {
    update(); // game logic
    staticRender();
    render();
}



// game logic update
function update() {
    layer_roids_lasers.update();
    layer_ship.update();
    layer_gui.update();
    layer_title.update();
    layer_game_over.update();
}

function render() {
    layer_roids_lasers.draw();
    layer_ship.draw();
    layer_gui.draw();
    layer_title.draw();
    layer_game_over.draw();
}

function staticRender() {
    background(2,2,4);
}

function setGameInvisible() {
    layer_roids_lasers.visible = false;
    layer_ship.visible = false;
    layer_gui.visible = false;
    layer_game_over.visible = false;
    layer_roids_lasers.update_check = false;
    layer_ship.update_check = false;
    layer_gui.update_check = false;
    layer_game_over.update_check = false;
}

function keyPressed() {
    //console.log(keypressed);
    if (keyCode === 32) {
        if (layer_title.visible || layer_game_over.visible) {
            startGame();
        }
    }
}

function startGame() {
    // layer_ship = new ObjectLayer();
    // layer_roids_lasers = new ObjectLayer();
    // ship = new Ship(layer_ship)
    // asteroids = new Asteroids(layer_roids_lasers)
    layer_game_over.visible = false;
    layer_game_over.update_check = false;
    layer_title.visible = false;
    layer_title.update_check = false;
    layer_roids_lasers.visible = true;
    layer_ship.visible = true;
    layer_gui.visible = true;
    layer_roids_lasers.update_check = true;
    layer_ship.update_check = true;
    layer_gui.update_check = true;
}

function gameOver() {
    //layer_title.visible = false;
    //layer_title.update_check = false;
    layer_roids_lasers.visible = false;
    layer_ship.visible = false;
    layer_gui.visible = false;
    layer_roids_lasers.update_check = false;
    layer_ship.update_check = false;
    layer_gui.update_check = false;
    layer_game_over.visible = true;
    layer_game_over.update_check = true;
}