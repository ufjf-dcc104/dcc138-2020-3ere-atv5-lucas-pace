import AssetManager from './AssetManager.js';
import Cena from './Cena.js'
import Sprite from './Sprites.js';


const assets = new AssetManager();
const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas, assets);
const ctx = canvas.getContext("2d")

const pc = new Sprite();
const pc1 = new Sprite({
    vx: 10,
    x: 10,
    y: 30,
    color: "green"
});
cena1.adicionar(pc)
cena1.adicionar(pc1)
cena1.adicionar(new Sprite({
    vx: 10,
    x: 10,
    y: 100,
    color: "red"
}))


cena1.iniciar()


assets.carregarImagem("human","assets/human.png")
assets.carregarImagem("orc","assets/orc.png")
assets.carregarImagem("skelly","assets/skelly.png")
assets.carregarAudio("zap","assets/zap.wav")




document.addEventListener("keydown", (e) =>{
    switch(e.key){
        case 's':
            cena1.iniciar();
            break;
        case "S":
            cena1.parar()
            break;
    }
  
})