import Sprite from "./Sprites.js";
import SpriteSummon from "./SpriteSummon.js";

/*
Cria quantidade X de sprites numa cena com os X e Y dentro de um intervalo
*/

export default class SpriteSummonInterval {
    constructor(cena, interval, width, height, pc, assets) {
        this.cena = cena;
        this.interval = interval;
        this.width = width;
        this.height = height;
        this.pc = pc;
        this.assets = assets;


    }

    startSummon() {
        setInterval(() => {
            this.summonGhost();
        }, this.interval);

        // if (this.cena.summonSprite) {
        //     var summon = new SpriteSummon(
        //         1,
        //         this.cena,
        //         this.assets,
        //         this.width,
        //         this.height,
        //         this.pc,
        //         true,
        //         true
        //     );
        //     this.summonByTime(summon);
        // }
    }

    summonGhost(summon) {
        // var summon = new SpriteSummon(
        //     1,
        //     this.cena,
        //     this.assets,
        //     this.width,
        //     this.height,
        //     this.pc,
        //     true,
        //     true
        // );
        console.log('deveria spawnar 1')
    }
}
