import SpriteCoin from "./SpriteCoin.js";
import Sprite from "./Sprites.js";

/*
Cria quantidade X de sprites numa cena com os X e Y dentro de um intervalo
*/

export default class SpriteSummon {
    constructor(quantidade = 0, cena, maxW, maxH, assets) {
        this.quantidade = quantidade;
        this.cena = cena;
        this.assets = assets;
        for (var i = 0; i < quantidade; i++) {
            const posX = Math.random() * (maxW - 66) + 33;
            const posY = Math.random() * (maxH - 66) + 33;

            const sprite = new SpriteCoin({
                // vx:
                //     (Math.floor(Math.random() * (25 - 5)) + 5) *
                //     (Math.random() < 0.5 ? -1 : 1),
                // vy:
                //     (Math.floor(Math.random() * (25 - 5)) + 5) *
                //     (Math.random() < 0.5 ? -1 : 1),
                vx: 0,
                vy: 0,
                x: posX,
                y: posY,
                w: 14,
                h: 14,
                assets: this.assets,
                tags: ["coin"],
            });
            var returned = cena.adicionar(sprite);
            // se não for uma posicao valida, criar outro sprite
            if (returned === null) i--;
        }
    }
}
