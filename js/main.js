import Cena from './Cena.js'
import Sprite from './Sprites.js';
const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas);
const ctx = canvas.getContext("2d")
cena1.desenhar()

const pc = new Sprite();
const pc1 = new Sprite({
    x: 30,
    y: 30,
    w: 30,
    h: 30,
    color: "red"
});

pc.desenhar(ctx)
pc1.desenhar(ctx)