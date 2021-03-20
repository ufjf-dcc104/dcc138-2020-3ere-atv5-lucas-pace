import { Tiles1 } from "../maps/modeloTiles.js";

export default class Mapa {
    constructor(linhas = 8, colunas = 12, tamanho = 32, assets) {
        this.LINHAS = linhas;
        this.COLUNAS = colunas;
        this.SIZE = tamanho;
        this.assets = assets;
        this.tiles = [];
        for (let l = 0; l < this.LINHAS; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = 0;
            }
        }
        this.modeloTiles = new Tiles1();
        this.cena = null;
    }

    desenhar(ctx) {
        for (let l = 0; l < this.LINHAS; l++) {
            for (let c = 0; c < this.COLUNAS; c++) {
                switch (this.tiles[l][c]) {
                    case 1:
                        //console.log(this.modeloTiles)
                        ctx.drawImage(
                            this.assets.img("terreno"),
                            this.modeloTiles.terreno[0],
                            this.modeloTiles.terreno[1],
                            this.modeloTiles.terreno[2],
                            this.modeloTiles.terreno[3],
                            c * 32,
                            l * 32,
                            32,
                            32
                        );
                        break;
                    case 2:
                        ctx.fillStyle = "red";
                        ctx.lineWidht = 1;
                        ctx.strokeStyle = "orange";
                        break;
                    case 3:
                        ctx.drawImage(
                            this.assets.img("terreno"),
                            this.modeloTiles.piso[0],
                            this.modeloTiles.piso[1],
                            this.modeloTiles.piso[2],
                            this.modeloTiles.piso[3],
                            c * 32,
                            l * 32,
                            32,
                            32
                        );
                        ctx.drawImage(
                            this.assets.img("chest"),
                            35,
                            35,
                            35,
                            35,
                            c * 32,
                            l * 32,
                            32,
                            32
                        );
                        break;
                    default:
                        ctx.drawImage(
                            this.assets.img("terreno"),
                            this.modeloTiles.piso[0],
                            this.modeloTiles.piso[1],
                            this.modeloTiles.piso[2],
                            this.modeloTiles.piso[3],
                            c * 32,
                            l * 32,
                            32,
                            32
                        );
                        break;
                }
                // ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE)
                // ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE)
            }
        }
    }

    carregaMapa(modelo) {
        this.LINHAS = modelo.length;
        this.COLUNAS = modelo[0]?.length ?? 0;

        this.tiles = [];
        for (let l = 0; l < this.LINHAS; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = modelo[l][c];
            }
        }
    }
}
