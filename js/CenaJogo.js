import Cena from "./Cena.js";
import SpriteSummon from "./SpriteSummon.js";
import SpriteSummonInterval from "./SpriteSummonInterval.js";
import Sprite from "./Sprites.js";
import modeloMapa1 from "../maps/mapa1.js";
import modeloMapa2 from "../maps/mapa2.js";
import Mapa from "./Mapa.js";
import SpriteWyvern from "./SpriteWyvern.js";
import SpriteCoin from "./SpriteCoin.js";
import SpriteChest from "./SpriteChest.js";
import SpriteWarrior from "./SpriteWarrior.js";

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if (a.tags.has("pc") && b.tags.has("coin")) { // COLISAO COIN PC
            if (!this.aRemover.includes(b)) this.aRemover.push(b);
            this.game.pontos++;
            return;
        } else if (a.tags.has("coin") && b.tags.has("pc")) {  //COLISAO COIN PC
            if (!this.aRemover.includes(a)) this.aRemover.push(a);
            this.game.pontos++;
            return;
        } else if (
            (b.tags.has("chest") || a.tags.has("chest")) && // COLISAO PC CHEST
            (b.tags.has("pc") || a.tags.has("pc"))
        ) {
            if (this.fase == 2) {
                this.rodando = false;
                this.fase = 1;
                this.game.selecionaCena("fim");
            } else {
                this.fase = 2;
                this.preparar();
            }
        } else if (a.tags.has("ghost") || b.tags.has("ghost")) {    // COLISAO GHOST PC
            if (a.tags.has("pc")) {
                this.aRemover.push(a);
                this.rodando = false;
                this.fase = 1;
                this.game.selecionaCena("fim");
            } else if (b.tags.has("pc")) {
                this.aRemover.push(b);
                this.rodando = false;
                this.fase = 1;
                this.game.selecionaCena("fim");
            }
        } else if (!this.aRemover.includes(a)) this.aRemover.push(a);
    }

    preparar() {
        super.preparar();
        const mapa1 = new Mapa(this.mapX, this.mapY, 32, this.assets);
        if (this.fase == 1) mapa1.carregaMapa(modeloMapa1);
        else mapa1.carregaMapa(modeloMapa2);

        this.configuraMapa(mapa1);

        const pc = new SpriteWarrior({
            vx: 0,
            vy: 0,
            x: 64,
            y: 64,
            w: 32,
            h: 32,
            assets: this.assets,
            //t: this.t
        });

        const summon = new SpriteSummon(
            4,
            this,
            this.canvas.width,
            this.canvas.height,
            this.assets,
            pc
        );
        // const summonInterval = new SpriteSummonInterval(this, 4000, canvas.width, canvas.height)
        // this.summonSprite = true; //boleano para habilitar o summon de sprite na cena
        // summonInterval.startSummon()

        //new SpriteSummon(100, this,canvas.width,canvas.height);

        const cena = this;
        pc.controlar = function (dt) {
            if (cena.game.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = -50;
                this.pose = 9;
            } else if (cena.game.input.comandos.get("MOVE_DIREITA")) {
                this.vx = 50;
                this.pose = 11;
            } else {
                this.vx = 0;
            }
            if (cena.game.input.comandos.get("MOVE_CIMA")) {
                this.vy = -50;
                this.pose = 8;
            } else if (cena.game.input.comandos.get("MOVE_BAIXO")) {
                this.vy = 50;
                this.pose = 10;
            } else {
                this.aux = 0;
                this.vy = 0;
            }
        };
        pc.tags.add("pc");
        this.adicionar(pc);
        const chest = new SpriteChest({
            x: 415,
            y: 415,
            w: 32,
            h: 32,
            assets: this.assets,
            tags: ["chest"],
        });
        this.adicionar(chest);

        // const pc1 = new SpriteCoin({
        //     vx: 0,
        //     x: 100,
        //     y: 50,
        //     w: 14,
        //     h: 14,
        //     tags: ["coin"],
        //     assets: this.assets,
        // });
        // this.adicionar(pc1);

        // this.adicionar(pc1);

        // this.adicionar(
        //     new Sprite({
        //         vx: 40,
        //         x: 100,
        //         y: 300,
        //         color: "red",
        //         controlar: perseguePC,
        //         tags: ["enemy"],
        //     })
        // );
    }

    desenhar() {
        this.ctx.fillStyle = "rgba(0,0,0,.2)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.mapa?.desenhar(this.ctx);
        if (this.assets.acabou())
            for (let s = 0; s < this.sprites.length; s++) {
                const sprite = this.sprites[s];
                sprite.desenhar(this.ctx);
                sprite.aplicaRestricoes();
            }
        this.ctx.font = "12px Impact";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(this.assets?.progresso(), 10, 20);
        this.ctx.fillStyle = "red";
        this.ctx.font = "20px Impact";
        this.ctx.fillText(this.game.pontos, 420, 22);
    }
}
