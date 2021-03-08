export default class Sprite {
    /* Responsável por modelar algo que se move dentro da cena
     */
    constructor({
        x = 50,
        y = 50,
        w = 20,
        h = 20,
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

    }
    desenhar(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)

    }
    passo(dt) {
        this.x = this.x + this.vx * dt
        this.y = this.y + this.vy * dt
    }

}