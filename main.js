
var layer_splash_screen, layer_gui, layer_ship, layer_drops, layer_asteroids, layer_lasers, layer_game_over;
var game, splash_screen, gui, ship, shields, item_drops, asteroids, lasers, game_over;

function setup() {
    // inital canvas setup
    createCanvas(window.innerWidth, window.innerHeight);
    // desired frame rate
    frameRate(60);
    //createCanvas(600,400)
    background(20,20,22);
    noStroke();
    // game state
    game = new Game();
    
    // layers

    layer_splash_screen = new ObjectLayer();
    splash_screen = new SplashScreen(layer_splash_screen);
    game.trackNewLayer(layer_splash_screen, "splash");

    layer_lasers = new ObjectLayer();
    lasers = new Lasers(layer_lasers);
    game.trackNewLayer(layer_lasers, "game");

    layer_ship = new ObjectLayer();
    ship = new Ship(layer_ship);
    shields = new Shields(layer_ship);
    game.trackNewLayer(layer_ship, "game");

    layer_drops = new ObjectLayer();
    item_drops = new  ItemDrops(layer_drops);
    game.trackNewLayer(layer_drops, "game");

    layer_asteroids = new ObjectLayer();
    asteroids = new Asteroids(layer_asteroids);
    game.trackNewLayer(layer_asteroids, "game");

    layer_gui = new ObjectLayer();
    gui = new GUI(layer_gui);
    game.trackNewLayer(layer_gui, "game");

    layer_game_over = new ObjectLayer();
    game_over = new DeadScreen(layer_game_over);
    game.trackNewLayer(layer_game_over, "game_over");

    //BG_MUSIC_1.setVolume(0.5);
    //BG_MUSIC_1.play();
}

// draw loop occurs at framerate
function draw() {
    staticRender();
    game.update();
    game.draw();
}
// update static things
function staticRender() {
    background(2,2,4);
}