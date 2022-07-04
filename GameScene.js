class GameScene {
    constructor() {
        this.imageLoader = null;
        this.imgBackground = null;
        this.wavesManager = new WavesManager();
    }

    load(pImageLoader) {
        this.imageLoader = pImageLoader;
        this.imgBackground = this.imageLoader.getImage("images/Hell.png");
        this.background = new ScrollingBackground(this.imgBackground);
        this.background.speed = 3;

        // Joueur
        let imagePlayer = imageLoader.getImage("images/Arrow.png");
        spritePlayer = new Sprite(imagePlayer);
        spritePlayer.setTileSheet(200, 150);
        spritePlayer.x = 0;
        spritePlayer.y = 350;
        spritePlayer.currentFrame = 0;
        spritePlayer.addAnimations("ATTACK", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0.1, false);
        spritePlayer.addAnimations("DIE", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 0.1, false);
        spritePlayer.addAnimations("HURT", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 0.1, false);
        spritePlayer.addAnimations("IDLE", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 0.1, false);
        spritePlayer.addAnimations("JUMP", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 0.1, false);
        spritePlayer.addAnimations("RUN", [50, 51, 52, 53, 54, 55, 56, 57, 58, 59], 0.1, false);
        spritePlayer.addAnimations("WALK", [60, 61, 62, 63, 64, 65, 66, 67, 68, 69], 0.1, false);
        spritePlayer.startAnimation("ATTACK");

        lstSprites.push(spritePlayer);

        // Ennemi 1
        let imgEnnemy = imageLoader.getImage("images/Warrior.png");
        spriteEnnemy = new Sprite(imgEnnemy);
        spriteEnnemy.setTileSheet(200, 150);
        spriteEnnemy.addAnimations("ATTACK", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0.1,);  // par défault loop = true donc si on ne le met pas ça continue
        spriteEnnemy.addAnimations("DIE", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 0.1,);
        spriteEnnemy.addAnimations("HURT", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 0.1,);
        spriteEnnemy.addAnimations("IDLE", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 0.1,);
        spriteEnnemy.addAnimations("JUMP", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 0.1,);
        spriteEnnemy.addAnimations("RUN", [50, 51, 52, 53, 54, 55, 56, 57, 58, 59], 0.1,);
        spriteEnnemy.addAnimations("WALK", [60, 61, 62, 63, 64, 65, 66, 67, 68, 69], 0.1,);
        spriteEnnemy.startAnimation("WALK");


        // Ennemi 2
        let imgEnnemyDeux = imageLoader.getImage("images/Wizard.png");
        spriteEnnemyDeux = new Sprite(imgEnnemyDeux);
        spriteEnnemyDeux.setTileSheet(200, 150);
        spriteEnnemyDeux.addAnimations("ATTACK", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0.1, false);
        spriteEnnemyDeux.addAnimations("DIE", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 0.1, false);
        spriteEnnemyDeux.addAnimations("HURT", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 0.1, false);
        spriteEnnemyDeux.addAnimations("IDLE", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 0.1, false);
        spriteEnnemyDeux.addAnimations("JUMP", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 0.1, false);
        spriteEnnemyDeux.addAnimations("RUN", [50, 51, 52, 53, 54, 55, 56, 57, 58, 59], 0.1, false);
        spriteEnnemyDeux.addAnimations("WALK", [60, 61, 62, 63, 64, 65, 66, 67, 68, 69], 0.1, false);

        this.wavesManager.addWave(new EnnemyWave(spriteEnnemy, 5, 0.5, 940 + 150, 600, 350));
        this.wavesManager.addWave(new EnnemyWave(spriteEnnemyDeux, 5, 0.5, 940 + 2700, 650, 250));

        this.ParticleEmitter = new ParticleEmitter(screenTop, -100);
        for (let particle = 0; particle < 800; particle++) {
            this.ParticleEmitter.add();
        }
    }

    update(dt) {
        this.background.update(dt);
        this.wavesManager.update(dt, this.background.distance);
        this.ParticleEmitter.update(dt);
    }

    draw(pCtx) {
        pCtx.save();
        this.background.draw(pCtx);
        this.wavesManager.draw(pCtx);
        this.ParticleEmitter.draw(pCtx);

        pCtx.restore();
    }
}