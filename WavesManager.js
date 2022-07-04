class Ennemy {
    constructor(pSprite) {
        this.sprite = pSprite;
        this.timer = 0;
        this.pendingDelay = 0;
        this.moveSpeed = 1;
        this.started = false;
    }

    update(dt) {
        this.sprite.update(dt);
    }

    draw(pCtx) {
        this.sprite.draw(pCtx);
    }
}

class EnnemyWave {
    constructor(pSprite, pNumber, pPendingDelay, pStartDistance, pX, pY) {
        this.ennemyList = [];
        this.sprite = pSprite;
        this.startDistance = pStartDistance;
        this.started = false;
        this.number = pNumber;
        this.pendingDelay = pPendingDelay;
        this.x = pX;
        this.y = pY;

    }

    addEnnemy(pEnnemy) {
        this.ennemyList.push(pEnnemy);
    }

    update(dt) {

        for (let i = this.ennemyList.length - 1; i >= 0; i--) {
            let ennemy = this.ennemyList[i];

            if (ennemy.started == false) {
                ennemy.timer += dt;
                if (ennemy.timer >= ennemy.pendingDelay) {
                    console.log("Démarre ennemi à :" + ennemy.timer);
                    ennemy.started = true;
                }
            }

            if (ennemy.started) {
                ennemy.update(dt);
                ennemy.sprite.x -= ennemy.moveSpeed;
                if (ennemy.sprite.x < 0 - ennemy.sprite.tileSize.x) {
                    console.log("suppession ennemi hors écran");
                    this.ennemyList.splice(i, 1);
                }
            }
        }
    }

    draw(pCtx) {
        this.ennemyList.forEach(ennemy => {
            ennemy.draw(pCtx);
        });
    }
}

class WavesManager {
    constructor() {
        this.wavesList = [];
        this.currentWave = null;
    }

    addWave(pWave) {
        console.log("Ajoute une vague")
        this.wavesList.push(pWave);
    }

    stopWave(pWave) {
        console.log("Stoppe la vague précédante")
        let index = this.wavesList.indexOf(pWave);
        if (index != -1) {
            this.wavesList.splice(index, 1);
        }
    }

    startWave(pWave) {
        console.log("vague démarrée à " + pWave.startDistance);
        pWave.started = true;
        if (this.currentWave != null) {
            this.stopWave(pWave)
        }
        // console.log("je passe ici")
        this.currentWave = pWave;

        for (let i = 0; i < pWave.number; i++) {
            console.log("Créer ennemy " + i);

            // ENNEMI 1
            let spriteEnnemy = new Sprite(pWave.sprite.img);
            Object.assign(spriteEnnemy, pWave.sprite)

            let ennemy = new Ennemy(spriteEnnemy);
            ennemy.sprite.x = pWave.x;
            ennemy.sprite.y = pWave.y;
            ennemy.pendingDelay = i * pWave.pendingDelay;
            pWave.addEnnemy(ennemy);




        }
    }

    update(dt, pDistance) {
        this.wavesList.forEach(wave => {

            if (pDistance >= wave.startDistance && !wave.started) {
                this.startWave(wave);
                // console.log("je passe ici 1 ")

            }
        });
        // UPDATE VAGUE EN COURS
        if (this.currentWave != null) {
            this.currentWave.update(dt);
            // console.log("je passe ici 2")

        }
    }

    draw(pCtx) {
        if (this.currentWave != null) {
            this.currentWave.draw(pCtx)
            // console.log("je passe ici 3 ")

        }
    }
}