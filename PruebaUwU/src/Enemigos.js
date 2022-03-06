import Barra from './healthBar.js';
import Personajes from './Personajes.js';
export default class Enemigos extends Personajes {
  
  constructor(scene, m, x, y, f, npc, vida) {
    super(scene, x, y, f, npc, vida);   
    this.mapache = m;
    
    if(this.fisicas){

    }
    else{
      this.label = this.scene.add.text(x+70, y+110, "");
      this.barra = new Barra(scene, x-40, y+110, this.vida);
      this.updateScore();
    }
      
  }

  updateScore() {
    this.label.text = this.vida;
  }

}