import SpriteCoin from "./SpriteCoin.js";
import SpriteGhost from "./SpriteGhost.js";
import Sprite from "./Sprites.js";

/*
Cria quantidade X de sprites numa cena com os X e Y dentro de um intervalo
*/

export default class SpriteSummon {
    constructor(quantidade = 0, cena, maxW, maxH, assets, pc) {
        this.quantidade = quantidade;
        this.cena = cena;
        this.assets = assets;
        this.maxW = maxW;
        this.maxH = maxH;
        this.pc = pc;
        this.ghost = null;
        this.summonGhost();
        this.summonCoin();
    }

    summonCoin() {
        for (var i = 0; i < this.quantidade; i++) {
            const posX =
                (this.maxW / 15) * (Math.floor((Math.random() * 100) % 13) + 1);
            const posY =
                (this.maxH / 15) * (Math.floor((Math.random() * 100) % 13) + 1); // modd 13 + 1

            const sprite = new SpriteCoin({
                vx: 0,
                vy: 0,
                x: posX,
                y: posY,
                w: 14,
                h: 14,
                assets: this.assets,
                tags: ["coin"],
            });
            var returned = this.cena.adicionar(sprite);
            // se não for uma posicao valida, criar outro sprite
            if (returned === null) i--;
        }
    }

    summonGhost() {
        for (var i = 0; i < this.quantidade; i++) {
            const posX =
                (this.maxW / 15) * (Math.floor((Math.random() * 100) % 13) + 1);
            const posY =
                (this.maxH / 15) * (Math.floor((Math.random() * 100) % 13) + 1); // modd 13 + 1

            const ghost = new SpriteGhost({
                vx: 0,
                vy: 0,
                x: posX - 16,
                y: posY - 16,
                w: 32,
                h: 32,
                pc: this.pc,
                color: "red",
                assets: this.assets,
                tags: ["ghost"],
                // controlar: perseguePC,
            });
            this.ghost = ghost;

            this.x = posX;
            this.y = posY;
            var returned = this.cena.adicionar(ghost);
            // se não for uma posicao valida, criar outro sprite
            if (returned === null) i--;
        }

        function perseguePC() {
            this.vx = 15 * Math.sign(this.pc.x - this.x);
            this.vy = 15 * Math.sign(this.pc.y - this.y);
        }
    }
}
