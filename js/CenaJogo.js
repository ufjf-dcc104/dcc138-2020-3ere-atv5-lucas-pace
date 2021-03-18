import Cena from "./Cena.js";
import SpriteSummon from "./SpriteSummon.js";
import SpriteSummonInterval from "./SpriteSummonInterval.js";
import Sprite from "./Sprites.js";
import modeloMapa1 from "../maps/mapa1.js";
import Mapa from "./Mapa.js";

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if (!this.aRemover.includes(a)) this.aRemover.push(a);
        if (!this.aRemover.includes(b)) this.aRemover.push(b);
        console.log(b.tags);
        if (a.tags.has("pc") && b.tags.has("enemy")) {
            this.rodando = false;
            this.game.selecionaCena("fim");
        }
        this.assets.play("boom");
    }

    preparar() {
        super.preparar()
        const mapa1 = new Mapa(this.mapX, this.mapY, 32, this.assets);

        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        //const summon = new SpriteSummon(1, this, canvas.width, canvas.height)
        // const summonInterval = new SpriteSummonInterval(this, 4000, canvas.width, canvas.height)
        // this.summonSprite = true; //boleano para habilitar o summon de sprite na cena
        // summonInterval.startSummon()

        //new SpriteSummon(100, this,canvas.width,canvas.height);

        const pc = new Sprite({
            vx: 0,
            vy: 10,
            x: 100,
            y: 100,
        });

        const cena = this
        pc.controlar = function (dt) {
            if (cena.game.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = -50;
            } else if (cena.game.input.comandos.get("MOVE_DIREITA")) {
                this.vx = 50;
            } else {
                this.vx = 0;
            }
            if (cena.game.input.comandos.get("MOVE_CIMA")) {
                this.vy = -50;
            } else if (cena.game.input.comandos.get("MOVE_BAIXO")) {
                this.vy = 50;
            } else {
                this.vy = 0;
            }
        };
        pc.tags.add("pc");

        const pc1 = new Sprite({
            vx: 0,
            x: 100,
            y: 50,
            color: "silver",
            controlar: perseguePC,
            tags: ["enemy"],
        });
        this.adicionar(pc);

        function perseguePC(dt) {
            this.vx = 25 * Math.sign(pc.x - this.x);
            this.vy = 25 * Math.sign(pc.y - this.y);
        }

        this.adicionar(pc1);

        this.adicionar(
            new Sprite({
                vx: 40,
                x: 100,
                y: 300,
                color: "red",
                controlar: perseguePC,
                tags: ["enemy"],
            })
        );
    }
}
