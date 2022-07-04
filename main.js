let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let interval;
let fps = 0;

let derniereUpdate = Date.now();

var WIDTH = canvas.width;
canvas.width = WIDTH;
var HEIGHT = canvas.height;
canvas.height = HEIGHT;

let ctx2 = canvasInfos.getContext("2d");
ctx2.font = '20px Serif';

ctx2.fillStyle = "rgb(200,260,0)"
ctx2.fillText('Score :', 50, 100)
ctx2.fillText('Combos :', 50, 200)

ctx2.beginPath();
ctx2.arc(240, 160, 20, 0, Math.PI * 2, false);
ctx2.fillStyle = "green";
ctx2.fill();
ctx2.closePath();


function showFPS() {
    ctx.fillStyle = "White";
    ctx.font = "normal 16pt Arial";

    ctx.fillText(Math.floor(fps) + " fps", 10, 20);
}


function run() {

    let maintenant = Date.now();
    let dt = (maintenant - derniereUpdate) / 1000;
    fps = 1 / dt;
    derniereUpdate = maintenant;
    update(dt);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(ctx);
    showFPS();

}

function init() {

    console.log("init")
    load();
    interval = setInterval(run, 1000 / 60);
}

init();
