import Sprite from "./Sprites.js";
import AssetManager from "./AssetManager.js";

export default class SpriteGhost extends Sprite {
    passo(dt) {
        this.controlar(dt);
        this.mover(dt);
        this.animar(this.cena.ctx);
        // console.log(this.pc)
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
            this.assets.img("ghost"),
            //sx, sy, sw, sh
            Math.floor(this.quadro) * 48 + 288,
            this.pose * 48 + 192 + 48 * this.pose,
            48,
            48,
            //dx, dy, dw, dh
            this.x - 16,
            this.y - 16,
            this.w,
            this.h
        );
        this.quadro = this.quadro > 6 ? 0 : this.quadro + this.cena.dt * 1;
    }


    checarValido() {
        var mx = Math.floor(this.x / this.cena.mapa.SIZE);
        var my = Math.floor(this.y / this.cena.mapa.SIZE);
        if (this.cena.mapa.tiles[my][mx] == 0 && my > 5 && my > 5) {
            return true;
        }
    }
}
