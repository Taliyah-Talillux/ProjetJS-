let imageLoader = new ImageLoader();
let gameReady = false;
let gameScene = new GameScene();

let spritePlayer;
let spriteEnnemy;
let spriteEnnemyDeux;

let Keyboard = [];

function toucheEnfoncee(t) {
    t.preventDefault();
    Keyboard[t.code] = true;
}

function toucheRelachee(t) {
    t.preventDefault();
    Keyboard[t.code] = false;
}

function load() {
    document.addEventListener("keydown", toucheEnfoncee, false);
    document.addEventListener("keyup", toucheRelachee, false);
    imageLoader.add("images/Arrow.png");
    imageLoader.add("images/Warrior.png");
    imageLoader.add("images/Wizard.png");
    imageLoader.add("images/Hell.png");

    imageLoader.start(startGame);
}

function startGame() {

    console.log("Start Game");

    lstSprites = [];

    gameScene.load(imageLoader);

    gameReady = true;

}

function update(dt) {

    if (!gameReady) {
        return;
    }

    // SCENE JEU
    gameScene.update(dt);

    if (Keyboard["ArrowDown"]) {
        spritePlayer.y += 2;
        spritePlayer.startAnimation("WALK")
        if (spritePlayer.stateAnimation.end) {
            spritePlayer.startAnimation("IDLE");
        }
    }
    if (Keyboard["ArrowUp"]) {
        spritePlayer.y -= 2;
        spritePlayer.startAnimation("WALK")
        if (spritePlayer.stateAnimation.end) {
            spritePlayer.startAnimation("IDLE");
        }
    }

    if (Keyboard["Space"]) {
        spritePlayer.startAnimation("ATTACK")
        if (spritePlayer.stateAnimation.end) {
            spritePlayer.startAnimation("IDLE");
        }
    }

    lstSprites.forEach(sprite => {
        sprite.update(dt);
    });

}

function draw(pCtx) {

    if (!gameReady) {
        let ratio = imageLoader.getLoadedRatio();
        pCtx.fillStyle = "rgb(255,255,255)";
        pCtx.fillRect(1, 1, 400, 100);
        pCtx.fillStyle = "rgb(0,255,0)";
        pCtx.fillRect(1, 1, 400 * ratio, 100);

        return;
    }

    gameScene.draw(pCtx);

    spritePlayer.draw(pCtx);
};
