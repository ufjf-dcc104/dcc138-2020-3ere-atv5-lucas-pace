import SpriteSummon from "./SpriteSummon.js";

var self = this;
export default class Cena {
    /*
        Responsável por desenhar elementos na tela em uma animação
    */

    constructor(canvas = null, assets = null) {
        this.canvas = canvas;
        this.ctx = canvas?.getContext("2d");
        this.assets = assets;
        this.game = null;
        this.pontos = 0
        this.preparar();
    }

    desenhar() {
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.mapa?.desenhar(this.ctx);
        if (this.assets.acabou())
            for (let s = 0; s < this.sprites.length; s++) {
                const sprite = this.sprites[s];
                sprite.desenhar(this.ctx);
                sprite.aplicaRestricoes();
            }
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(this.assets?.progresso(), 10, 20);
    }

    adicionar(sprite) {
        sprite.cena = this;
        if (sprite.checarValido())
            // check para nao criar sprite se estiver numa posicao invalida
            this.sprites.push(sprite);
        else return null;
    }

    passo(dt) {
        if (this.assets.acabou()) {
            for (const sprite of this.sprites) {
                sprite.passo(dt);
            }
        }
    }
    quadro(t) {
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0) / 1000;

        this.passo(this.dt);
        this.desenhar();
        this.checaColisao();

        this.t0 = t;
        if (this.rodando) this.iniciar();
        this.removeSprites();
    }
    iniciar() {
        this.rodando = true;
        this.idAnim = requestAnimationFrame((t) => {
            this.quadro(t);
        });
    }
    parar() {
        this.rodando = false;
        cancelAnimationFrame(this.idAnim);
        this.t0 = null;
        this.dt = 0;
    }
    checaColisao() {
        for (let a = 0; a < this.sprites.length - 1; a++) {
            for (let b = a + 1; b < this.sprites.length; b++) {
                if (this.sprites[a].colidiuCom(this.sprites[b]))
                    this.quandoColidir(this.sprites[a], this.sprites[b]);
            }
        }
    }
    quandoColidir(a, b) {
        if (!this.aRemover.includes(a)) this.aRemover.push(a);
        if (!this.aRemover.includes(b)) this.aRemover.push(b);
        this.assets.play("boom");
    }

    removeSprites() {
        this.aRemover.forEach((alvo) => {
            const idx = this.sprites.indexOf(alvo);
            if (idx >= 0) this.sprites.splice(idx, 1);
        });
    }

    configuraMapa(mapa) {
        this.mapa = mapa;
        this.mapa.cena = this;
    }

    preparar() {
        const mapX = 15;
        const mapY = 15;
        this.canvas.width = mapX * 32;
        this.canvas.height = mapY * 32;

        this.sprites = [];
        this.t0 = null;
        this.dt = 0;
        this.aRemover = [];
        this.idAnim = null;
        this.mapa = null;
        this.summonSprite = false; // se deve ser summonado ou nao
        // true se ainda nao foi inicializado
        this.rodando = true;
    }
}
