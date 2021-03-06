export default class Sprite {
    /* Responsável por modelar algo que se move dentro da cena
     */
    constructor({
        x = 50,
        y = 50,
        h = 32,
        w = 32,
        color = "white",
        vx = 0,
        vy = 0,
        controlar = () => {},
        tags = [],
        assets = null,
        t = 0,
        pc = null
    } = {}) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.cena = null;
        this.mx = 0;
        this.my = 0;
        this.controlar = controlar;
        this.tags = new Set();
        this.assets = assets;
        this.t = t;
        this.quadro = 0;
        this.pose = 0;
        this.pc = pc
        tags.forEach((tag) => {
            this.tags.add(tag);
        });
    }
    desenhar(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(
            this.mx * this.cena.mapa.SIZE,
            this.my * this.cena.mapa.SIZE,
            this.cena.mapa.SIZE,
            this.cena.mapa.SIZE
        );
    }

    getMx() {
        return Math.floor(this.x / this.cena.mapa.SIZE);
    }

    getMy() {
        return Math.floor(this.y / this.cena.mapa.SIZE);
    }

    passo(dt) {
        this.controlar(dt);
        this.mover(dt);
    }

    colidiuCom(outro) {
        return !(
            this.x - this.w / 2 > outro.x + outro.w / 2 ||
            this.x + this.w / 2 < outro.x - outro.w / 2 ||
            this.y - this.h / 2 > outro.y + outro.h / 2 ||
            this.y + this.h / 2 < outro.y - outro.h / 2
        );
    }

    aplicaRestricoes(dt) {
        this.aplicaRestricoesDireita(this.mx + 1, this.my - 1);
        this.aplicaRestricoesDireita(this.mx + 1, this.my);
        this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);
        this.aplicaRestricoesCima(this.mx - 1, this.my - 1);
        this.aplicaRestricoesCima(this.mx, this.my - 1);
        this.aplicaRestricoesCima(this.mx + 1, this.my - 1);
    }

    aplicaRestricoesDireita(pmx, pmy) {
        const SIZE = this.cena.mapa.SIZE;
        if (this.vx > 0) {
            if (this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {
                    x: pmx * SIZE + SIZE / 2,
                    y: pmy * SIZE + SIZE / 2,
                    w: SIZE,
                    h: SIZE,
                };
                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(
                    tile.x - SIZE / 2,
                    tile.y - SIZE / 2,
                    SIZE,
                    SIZE
                );
                if (this.colidiuCom(tile)) {
                    this.vx = 0;
                    this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
                }
            }
        }
    }
    aplicaRestricoesEsquerda(pmx, pmy) {
        const SIZE = this.cena.mapa.SIZE;
        if (this.vx < 0) {
            if (this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {
                    x: pmx * SIZE + SIZE / 2,
                    y: pmy * SIZE + SIZE / 2,
                    w: SIZE,
                    h: SIZE,
                };
                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(
                    tile.x - SIZE / 2,
                    tile.y - SIZE / 2,
                    SIZE,
                    SIZE
                );
                if (this.colidiuCom(tile)) {
                    this.vx = 0;
                    this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
                }
            }
        }
    }

    aplicaRestricoesBaixo(pmx, pmy) {
        const SIZE = this.cena.mapa.SIZE;
        if (this.vy > 0) {
            const pmx = this.mx;
            const pmy = this.my + 1;
            if (this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {
                    x: pmx * SIZE + SIZE / 2,
                    y: pmy * SIZE + SIZE / 2,
                    w: SIZE,
                    h: SIZE,
                };
                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(
                    tile.x - SIZE / 2,
                    tile.y - SIZE / 2,
                    SIZE,
                    SIZE
                );
                if (this.colidiuCom(tile)) {
                    this.vy = 0;
                    this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
                }
            }
        }
    }
    aplicaRestricoesCima(pmx, pmy) {
        const SIZE = this.cena.mapa.SIZE;
        if (this.vy < 0) {
            const pmx = this.mx;
            const pmy = this.my - 1;
            if (this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {
                    x: pmx * SIZE + SIZE / 2,
                    y: pmy * SIZE + SIZE / 2,
                    w: SIZE,
                    h: SIZE,
                };
                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(
                    tile.x - SIZE / 2,
                    tile.y - SIZE / 2,
                    SIZE,
                    SIZE
                );
                if (this.colidiuCom(tile)) {
                    this.vy = 0;
                    this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
                }
            }
        }
    }

    checarValido() {
        var mx = Math.floor(this.x / this.cena.mapa.SIZE);
        var my = Math.floor(this.y / this.cena.mapa.SIZE);
        if (this.cena.mapa.tiles[my][mx] == 0) {
            return true;
        }
    }

    controlar(dt) {}

    mover(dt) {
        this.x = this.x + this.vx * 3*dt;
        this.y = this.y + this.vy * 3*dt;
        this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
        this.my = Math.floor(this.y / this.cena.mapa.SIZE);
    }
}
