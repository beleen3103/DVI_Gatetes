import Barra from './healthBar.js';
import Personajes from './Personajes.js';
export default class Enemigos extends Personajes {
  
  constructor(scene, m, x, y, f, npc, vida) {
    super(scene, x, y, f, npc, vida, 40, 110, 70);
    this.flecha = scene.add.image(x,y - 130, 'flecha').setVisible(false);
    
  }
 
  flechaVisible(visible){  
      this.flecha.setVisible(visible);
  }
}