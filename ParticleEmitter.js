class Particle {
    constructor(pX, pY, pW, pH) {
        this.x = pX;
        this.y = pY;
        this.Width = pW;
        this.Height = pH;
        this.life = 2000 / 10;
        var angle = Math.random() * (2 * Math.PI);
        this.vx = (rnd(10, 200) / 100) * Math.sin(angle);
        this.vy = (rnd(10, 200) / 100) * Math.cos(angle);
        this.vy /= 2;
        this.radius = rnd(1, 5)
    }

    update(dt) {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99
        this.vy *= 0.99
        this.vy += 0.01;
        this.life -= dt;
    }

    draw(pCtx) {
        DrawCircle(pCtx, this.x, this.y, this.radius);

    }
}

class ParticleEmitter {
    constructor(pX, pY, pW) {
        this.lstParticles = [];
        this.x = pX;
        this.y = pY;
    }

    add() { // on peux ajouter un type si pls types de particules
        var particle = new Particle(this.x + rnd(-5, WIDTH), this.y + rnd(-5, HEIGHT));
        this.lstParticles.push(particle);
    }

    update(dt) {
        for (var index = this.lstParticles.length - 1; index >= 0; index--) {
            var particle = this.lstParticles[index];
            particle.update(dt);
            if (particle.x <= 0) {
                this.lstParticles.splice(index, 1);
                console.log("pos particles : ", particle.x)

            }

        }
    }

    draw(pCtx) {
        this.lstParticles.forEach(particle => {
            particle.draw(pCtx);
        });

    }
}
