import AssetManager from './AssetManager.js';
import Cena from './Cena.js'
import Mapa from './Mapa.js';
import Mixer from './Mixer.js';
import Sprite from './Sprites.js';
import modeloMapa1 from '../maps/mapa1.js'
import SpriteSummon from './SpriteSummon.js';
import SpriteSummonInterval from './SpriteSummonInterval.js';

const mapX = 15;
const mapY = 15;

const mixer = new Mixer(10)
const assets = new AssetManager(mixer);
const canvas = document.querySelector("canvas");
canvas.width = mapX * 32
canvas.height = mapY * 32
const cena1 = new Cena(canvas, assets);
const ctx = canvas.getContext("2d")
const mapa1 = new Mapa(mapX, mapY, 32)
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1)

//const summon = new SpriteSummon(1, cena1, canvas.width, canvas.height)
const summonInterval = new SpriteSummonInterval(cena1, 4000, canvas.width, canvas.height)
cena1.summonSprite = true; //boleano para habilitar o summon de sprite na cena
summonInterval.startSummon()

//new SpriteSummon(100, cena1,canvas.width,canvas.height);

// const pc = new Sprite({
//     vx: 0,
//     vy: 10,
//     x: 300,
//     y: 50
// });
// const pc1 = new Sprite({
//     vx: 0,
//     x: 100,
//     y: 50,
//     color: "green"
// });
// cena1.adicionar(pc)
// cena1.adicionar(pc1)
// cena1.adicionar(new Sprite({
//     vx: 40,
//     x: 100,
//     y: 110,
//     color: "red"
// }))


cena1.iniciar()


assets.carregarImagem("human", "assets/human.png")
assets.carregarImagem("orc", "assets/orc.png")
assets.carregarImagem("skelly", "assets/skelly.png")
assets.carregarAudio("zap", "assets/zap.wav")
assets.carregarAudio("boom", "assets/boom.wav")




document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 's':
            cena1.iniciar();
            break;
        case "S":
            cena1.parar()
            break;
        case "c":
            assets.play("zap")
            break;
        case "b":
            assets.play("boom")
            break;
    }

})