import Sprite from "./Sprites.js";
import AssetManager from "./AssetManager.js";

export default class SpriteCoin extends Sprite {
    passo(dt) {
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
            this.assets.img("coin"),
            //sx, sy, sw, sh
            Math.floor(this.quadro) * 16,
            this.pose * 16,
            16,
            16,
            //dx, dy, dw, dh
            this.x,
            this.y,
            this.w,
            this.h
        );
        this.quadro = this.quadro > 12 ? 0 : this.quadro + this.cena.dt * 6;
    }


}
