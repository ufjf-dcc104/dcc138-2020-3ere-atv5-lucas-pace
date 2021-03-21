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
        var aux = 1;
        if (this.pose == 0) {
            aux = 0;
        }
        ctx.drawImage(
            this.assets.img("warrior"),
            //sx, sy, sw, sh
            Math.floor(this.quadro) * 64 * aux,
            this.pose * 64 * aux,
            64,
            64,
            //dx, dy, dw, dh
            this.x - 16,
            this.y - 16,
            this.w,
            this.h
        );
        this.quadro = this.quadro > 9 ? 0 : this.quadro + this.cena.dt * 2;
    }
}
