class Sprite {
    constructor(pImg, pX = 0, pY = 0) {
        this.img = pImg;
        this.x = pX;
        this.y = pY;
        this.speed = 20;
        this.currentFrame = 0;
        this.currentFrameInAnimation = 0;
        this.stateAnimation = null;
        this.frameTimer = 0;

        this.tileSize = {
            x: 0,
            y: 0
        }
        this.tileSheet = false;

        this.animations = [];
    }
    // AJOUT DES ANIMATIONS DE FRAMES
    addAnimations(pName, pFrames, pSpeed, pLoop = true) {
        let animations = {
            name: pName,
            frames: pFrames,
            speed: pSpeed,
            loop: pLoop,
            end: false,
        }
        this.animations.push(animations);
    }
    // ANIMATION DE LA FRAME
    startAnimation(pName) {
        if (this.stateAnimation != null) {
            if (this.stateAnimation.name == pName) {
                return;
            }
        }
        this.animations.forEach(animations => {
            if (animations.name == pName) {
                this.stateAnimation = animations;
                this.currentFrameInAnimation = 0;
                this.currentFrame = this.stateAnimation.frames[this.currentFrameInAnimation] // Etat : "walk", "hurt" // [image en cours : 1,2,3...]
                this.stateAnimation.end = false;
            }
        });
    }

    // DIMENSIONS TILESHEET 
    setTileSheet(pSizeX, pSizeY) {
        this.tileSheet = true;
        this.tileSize.x = pSizeX;
        this.tileSize.y = pSizeY;
        console.log("SizeX : ", this.tileSize.x)
        console.log("SizeY : ", this.tileSize.y)
    }

    // UPDATE ANIMATION
    update(dt) {
        if (this.stateAnimation != null) {
            this.frameTimer += dt;
            if (this.frameTimer >= this.stateAnimation.speed) {
                this.frameTimer = 0;
                this.currentFrameInAnimation++;
                if (this.currentFrameInAnimation > this.stateAnimation.frames.length - 1) {
                    if (this.stateAnimation.loop) {
                        this.currentFrameInAnimation = 0;
                    }
                    else {
                        this.currentFrameInAnimation--; // ou this.stateAnimation.frames.length - 1
                        this.stateAnimation.end = true // si on boucle pas alors fin de l'animation = vrai
                    }
                }
                this.currentFrame = this.stateAnimation.frames[this.currentFrameInAnimation];
            }
        }
    }

    draw(pCtx) {

        if (!this.tileSheet) {
            pCtx.drawImage(this.img, this.x, this.y);

        }
        else {
            let nbCol = this.img.width / this.tileSize.x;
            // console.log("nb col :", nbCol);
            let c = 0;
            let l = 0;
            // Découpage de la frame
            l = Math.floor(this.currentFrame / nbCol);
            c = this.currentFrame - (l * nbCol);
            // Position de la frame
            let x = c * this.tileSize.x;
            let y = l * this.tileSize.y;
            //  Affichage de la frame
            pCtx.drawImage(this.img, x, y, this.tileSize.x, this.tileSize.y, this.x, this.y, this.tileSize.x, this.tileSize.y)

        }
    }
}
