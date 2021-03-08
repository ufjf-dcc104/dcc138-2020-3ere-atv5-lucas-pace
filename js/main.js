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


const img1 = new Image();
img1.src = "assets/human.png"
const img2 = new Image();
img2.src = "assets/skelly.png"
const img3 = new Image();
img3.src = "assets/orc.png"

document.body.appendChild(img1)
document.body.appendChild(img2)
document.body.appendChild(img3)


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