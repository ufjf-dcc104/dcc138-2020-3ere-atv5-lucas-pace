export default class Sprite {
    /* Responsável por modelar algo que se move dentro da cena
     */
    constructor({
        x = 50,
        y = 50,
        h = 20,
        w = 20,
        color = "white",
        vx = 0,
        vy = 0
    } = {}) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.vx = vx
        this.vy = vy
        this.color = color
        this.cena = null
        this.mx = 0
        this.my = 0

    }
    desenhar(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h)
        ctx.strokeStyle = "blue"
        ctx.strokeRect(this.mx * this.cena.mapa.SIZE,
            this.my * this.cena.mapa.SIZE,
            this.cena.mapa.SIZE,
            this.cena.mapa.SIZE
        )

    }
    passo(dt) {

        this.x = this.x + this.vx * dt
        this.y = this.y + this.vy * dt
        this.mx = Math.floor(this.x / this.cena.mapa.SIZE)
        this.my = Math.floor(this.y / this.cena.mapa.SIZE)
        // console.log(this.mx)
    }

    colidiuCom(outro) {
        return !(
            (this.x - this.w / 2 > outro.x + outro.w / 2) ||
            (this.x + this.w / 2 < outro.x - outro.w / 2) ||
            (this.y - this.h / 2 > outro.y + outro.h / 2) ||
            (this.y + this.h / 2 < outro.y - outro.h / 2)
        )
    }


}