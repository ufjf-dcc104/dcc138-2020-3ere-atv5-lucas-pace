import AssetManager from './AssetManager.js';
import Cena from './Cena.js'
import CenaJogo from './CenaJogo.js'
import Mapa from './Mapa.js';
import Mixer from './Mixer.js';
import Sprite from './Sprites.js';
import modeloMapa1 from '../maps/mapa1.js'
import ImputManager from './InputManager.js'

import SpriteSummon from './SpriteSummon.js';
import SpriteSummonInterval from './SpriteSummonInterval.js';
import Game from './Game.js';
import CenaCarregando from './CenaCarregando.js';

const mapX = 15;
const mapY = 15;

const input = new ImputManager()
const mixer = new Mixer(10)
const assets = new AssetManager(mixer);
const canvas = document.querySelector("canvas");
canvas.width = mapX * 32
canvas.height = mapY * 32

//teclado
input.configurarTeclado({
    "ArrowLeft": "MOVE_ESQUERDA",
    "ArrowRight": "MOVE_DIREITA",
    "ArrowUp": "MOVE_CIMA",
    "ArrowDown": "MOVE_BAIXO",
})


const game = new Game(canvas, assets, input)

const cena0 = new CenaCarregando(canvas, assets);
const cena1 = new CenaJogo(canvas, assets);
game.adicionarCena("carregando", cena0)
game.adicionarCena("jogo", cena1)
const ctx = canvas.getContext("2d")
const mapa1 = new Mapa(mapX, mapY, 32, assets)

mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1)

//const summon = new SpriteSummon(1, cena1, canvas.width, canvas.height)
// const summonInterval = new SpriteSummonInterval(cena1, 4000, canvas.width, canvas.height)
// cena1.summonSprite = true; //boleano para habilitar o summon de sprite na cena
// summonInterval.startSummon()


//new SpriteSummon(100, cena1,canvas.width,canvas.height);

const pc = new Sprite({
    vx: 0,
    vy: 10,
    x: 300,
    y: 50
});
pc.controlar = function (dt) {
    if (input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -50
    } else if (input.comandos.get("MOVE_DIREITA")) {
        this.vx = 50
    } else {
        this.vx = 0
    }
    if (input.comandos.get("MOVE_CIMA")) {
        this.vy = -50
    } else if (input.comandos.get("MOVE_BAIXO")) {
        this.vy = 50
    } else {
        this.vy = 0
    }
}

const pc1 = new Sprite({
    vx: 0,
    x: 100,
    y: 50,
    color: "silver",
    controlar: perseguePC
});
cena1.adicionar(pc)

function perseguePC(dt) {
    this.vx = 25 * Math.sign(pc.x - this.x)
    this.vy = 25*Math.sign(pc.y - this.y)
}


cena1.adicionar(pc1)

cena1.adicionar(new Sprite({
    vx: 40,
    x: 100,
    y: 300,
    color: "red",
    controlar: perseguePC
}))




assets.carregarImagem("human", "assets/human.png")
assets.carregarImagem("orc", "assets/orc.png")
assets.carregarImagem("skelly", "assets/skelly.png")
assets.carregarImagem("terreno", "assets/terreno.png")
assets.carregarAudio("zap", "assets/zap.wav")
assets.carregarAudio("boom", "assets/boom.wav")

game.iniciar()

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 's':
            game.iniciar();
            break;
        case "S":
            game.parar()
            break;
        case "c":
            assets.play("zap")
            break;
        case "b":
            assets.play("boom")
            break;
    }

})