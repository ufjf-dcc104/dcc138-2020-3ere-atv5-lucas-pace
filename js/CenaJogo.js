import Cena from "./Cena.js";
import SpriteSummon from "./SpriteSummon.js";
import SpriteSummonInterval from "./SpriteSummonInterval.js";
import Sprite from "./Sprites.js";
import modeloMapa1 from "../maps/mapa1.js";
import Mapa from "./Mapa.js";
import SpriteWyvern from "./SpriteWyvern.js";
import SpriteCoin from "./SpriteCoin.js";

export default class CenaJogo extends Cena {

    quandoColidir(a, b) {
        if (a.tags.has("pc") && b.tags.has("coin")) {
            if (!this.aRemover.includes(b)) this.aRemover.push(b);
            this.pontos++;
            return;
        } else if (a.tags.has("coin") && b.tags.has("pc")) {
            if (!this.aRemover.includes(a)) this.aRemover.push(a);
            this.pontos++;
            return;
        } else if (){


        }
        else (!this.aRemover.includes(a)) this.aRemover.push(a);
    }


    preparar() {
        super.preparar();
        const mapa1 = new Mapa(this.mapX, this.mapY, 32, this.assets);

        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const summon = new SpriteSummon(
            10,
            this,
            this.canvas.width,
            this.canvas.height,
            this.assets
        );
        // const summonInterval = new SpriteSummonInterval(this, 4000, canvas.width, canvas.height)
        // this.summonSprite = true; //boleano para habilitar o summon de sprite na cena
        // summonInterval.startSummon()

        //new SpriteSummon(100, this,canvas.width,canvas.height);

        const pc = new SpriteWyvern({
            vx: 0,
            vy: 0,
            x: 100,
            y: 100,
            w: 32,
            h: 32,
            assets: this.assets,
            //t: this.t
        });

        const cena = this;
        pc.controlar = function (dt) {
            if (cena.game.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = -50;
                this.pose = 1;
            } else if (cena.game.input.comandos.get("MOVE_DIREITA")) {
                this.vx = 50;
                this.pose = 2;
            } else {
                this.vx = 0;
            }
            if (cena.game.input.comandos.get("MOVE_CIMA")) {
                this.vy = -50;
                this.pose = 3;
            } else if (cena.game.input.comandos.get("MOVE_BAIXO")) {
                this.vy = 50;
                this.pose = 0;
            } else {
                this.vy = 0;
            }
        };
        pc.tags.add("pc");
        this.adicionar(pc);

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

        // function perseguePC(dt) {
        //     this.vx = 25 * Math.sign(pc.x - this.x);
        //     this.vy = 25 * Math.sign(pc.y - this.y);
        // }

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
        this.ctx.fillText(this.pontos, 420, 22);
    }
}
