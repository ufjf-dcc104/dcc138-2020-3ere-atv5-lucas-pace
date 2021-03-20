import Sprite from "./Sprites.js";
import AssetManager from "./AssetManager.js";

export default class SpriteWyvern extends Sprite {
    passo(dt) {
        this.controlar(dt);
        this.mover(dt);
        this.animar(this.cena.ctx);
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
        ctx.drawImage(
            this.assets.img("wyvern"),
            //sx, sy, sw, sh
            Math.floor(this.quadro) * 96,
            this.pose * 64,
            86,
            64,
            //dx, dy, dw, dh
            this.x - 24,
            this.y - 24,
            this.w,
            this.h
        );
        this.quadro = this.quadro > 3 ? 0 : this.quadro + this.cena.dt * 2;
    }
}
