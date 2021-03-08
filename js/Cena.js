export default class Cena {
    /* 
        Responsável por desenhar elementos na tela em uma animação
    */
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
        this.sprites = []
        this.t0 = 0
        this.dt = 0;
        this.idAnim = null;
    }
    desenhar() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        for (let s = 0; s < this.sprites.length; s++) {
            const sprite = this.sprites[s];
            sprite.desenhar(this.ctx)
        }
    
    }

    adicionar(sprite) {
        this.sprites.push(sprite)
    }

    passo(dt) {
        for (const sprite of this.sprites) {
            sprite.passo(dt)
        }
    }
    quadro(t) {
        this.t0 = this.t0 ?? t
        this.dt = (t - this.t0) / 1000

        this.passo(this.dt)
        this.desenhar()
        this.checaColisao()
        this.t0 = t
        this.iniciar()

    }
    iniciar() {
        this.idAnim = requestAnimationFrame((t) => {
            this.quadro(t)
        });
    }
    parar() {
        cancelAnimationFrame(this.idAnim)
        this.t0 = null
        this.dt = 0
    }
    checaColisao() {
        for (let a = 0; a < this.sprites.length-1; a++) {
            for (let b = a + 1; b < this.sprites.length; b++) {
                if(this.sprites[a].colidiuCom(this.sprites[b]))
                console.log(this.sprites[a], this.sprites[b] )

            }
        }
    }

}