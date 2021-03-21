import Sprite from "./Sprites.js";
import AssetManager from "./AssetManager.js";

export default class SpriteWarrior extends Sprite {
    passo(dt) {
        this.animar(this.cena.ctx);
        this.controlar(dt);
        this.mover(dt);
    }

    /*
   ctx.drawImage(archer,
                //sx, sy, sw, sh
                Math.floor(quadro) * 64, Math.floor(POSES[poseAtual].pose) * 64, 64, 64,
                //dx, dy, dw, dh
                0, 0, 64, 64
            )
            quadro = quadro > POSES[poseAtual].pmax ? 0 : quadro + POSES[poseAtual].pv * dt;


    */

    desenhar(ctx) {
        this.animar(ctx);
    }

    animar(ctx) {
        if (this.vx == 0 && this.vy == 0) {
            this.aux = 0;
        }
        ctx.drawImage(
            this.assets.img("warrior"),
            //sx, sy, sw, sh
            Math.floor(this.quadro) * 64,
            this.pose * 64,
            64,
            64,
            //dx, dy, dw, dh
            this.x - 16,
            this.y - 16,
            this.w,
            this.h
        );
        if (this.aux != 0)
            this.quadro = this.quadro > 9 ? 0 : this.quadro + this.cena.dt * 6;
    }
}
