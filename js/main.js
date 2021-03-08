import Cena from './Cena.js'
import Sprite from './Sprites.js';
const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas);
const ctx = canvas.getContext("2d")

const pc = new Sprite();
const pc1 = new Sprite({
    vx: 10,
    x: 140,
    y: 30,
    color: "green"
});
cena1.adicionar(pc)
cena1.adicionar(pc1)


cena1.iniciar()

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