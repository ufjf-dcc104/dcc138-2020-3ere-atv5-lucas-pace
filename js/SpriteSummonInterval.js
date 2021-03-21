import Sprite from "./Sprites.js";
import SpriteSummon from "./SpriteSummon.js";

/*
Cria quantidade X de sprites numa cena com os X e Y dentro de um intervalo
*/

export default class SpriteSummonInterval {
    constructor(cena, interval, width, height, pc) {
        this.cena = cena;
        this.interval = interval;
        this.width = width;
        this.height = height;
        this.pc = pc
    }

    startSummon() {
        if (this.cena.summonSprite) {
            this.summonByTime(this.cena);
        }
    }
    summonByTime() {
        new SpriteSummon(1, this.cena, this.width, this.height, this.pc);
        setTimeout(this.summonByTime.bind(this), this.interval);
    }
}
