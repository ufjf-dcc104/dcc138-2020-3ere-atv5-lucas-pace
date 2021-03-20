import Sprite from "./Sprites.js";
import AssetManager from "./AssetManager.js";

export default class SpriteChest extends Sprite {
    passo(dt) {
        this.animar(this.cena.ctx);
    }
    desenhar(ctx) {
        this.animar(ctx);
    }

    animar(ctx) {
        ctx.drawImage(
            this.assets.img("chest"),
            35,
            35,
            35,
            35,
            this.x,
            this.y,
            this.w,
            this.h
        );
    }
}
