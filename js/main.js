import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import CenaJogo from "./CenaJogo.js";

import Mixer from "./Mixer.js";

import InputManager from "./InputManager.js";


import Game from "./Game.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";


const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);
const canvas = document.querySelector("canvas");




//teclado
input.configurarTeclado({
    ArrowLeft: "MOVE_ESQUERDA",
    ArrowRight: "MOVE_DIREITA",
    ArrowUp: "MOVE_CIMA",
    ArrowDown: "MOVE_BAIXO",
    " ": "PROXIMA_CENA",
});

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando(canvas, assets);
const cena1 = new CenaJogo(canvas, assets);
const cena2 = new CenaFim(canvas, assets);
game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1);
game.adicionarCena("fim", cena2);

const ctx = canvas.getContext("2d");

assets.carregarImagem("human", "assets/human.png");
assets.carregarImagem("wyvern", "assets/wyvern.png");
assets.carregarImagem("coin", "assets/coin.png");
assets.carregarImagem("orc", "assets/orc.png");
assets.carregarImagem("skelly", "assets/skelly.png");
assets.carregarImagem("terreno", "assets/terreno.png");
assets.carregarAudio("zap", "assets/zap.wav");
assets.carregarAudio("boom", "assets/boom.wav");

game.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            game.iniciar();
            break;
        case "S":
            game.parar();
            break;
        case "c":
            assets.play("zap");
            break;
        case "b":
            assets.play("boom");
            break;
    }
});
