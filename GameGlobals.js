
// colors
var GLITCH_COLOR_1 = "#FF0000EE";
var GLITCH_COLOR_2 = "#00FF00EE";
var GLITCH_COLOR_3 = "#0000FFEE";
var MAIN_COLOR = "#FFFFFF";
var HEALTH_BG_COLOR = "#FFFFFF11";

var MAIN_FONT;

function preload() {
    // Marvin Visions font used under free license
    // https://www.readvisions.com/marvin
    MAIN_FONT = loadFont("static/MarvinVisions-Bold.otf");
    // BG_MUSIC_1 = loadSound('static/Azureflux_-_02_-_Waves.mp3');
    //LASER_SOUND_1 = loadSound('static/Laser_Shoot7.wav');
}

function calcDist(a, b) {
    let x = Math.abs(a.x - b.x);
    let y = Math.abs(a.y - b.y);
    return Math.sqrt((x * x) + (y * y))
}