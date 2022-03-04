import Barra from './healthBar.js';
import Personajes from './Personajes.js';
export default class Enemigos extends Personajes {
  
  constructor(scene, m, x, y, f, npc, vida) {
    super(scene, x, y, f, npc, vida);   
    this.mapache = m;
    
    
      
  }

}