import Cena from "./Cena.js";

export default class CenaFim extends Cena {
    desenhar() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = "20px Impact";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";

        if (this.assets.acabou()) {
            this.ctx.fillText(
                "Sua pontuação foi de " + this.game.pontos,
                this.canvas.width / 2,
                this.canvas.height / 2
            );
            this.ctx.fillText(
                "Aperte espaço para jogar novamente",
                this.canvas.width / 2,
                this.canvas.height / 2 + 50
            );
        }
    }


    quadro(t) {
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0) / 1000;

        if (this.assets.acabou() && this.input.comandos.get("PROXIMA_CENA")) {
            this.game.selecionaCena("jogo")
            return
        }

        this.desenhar();

        this.iniciar();
        this.removeSprites();
    }
}
