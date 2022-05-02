import Enemigos from './Enemigos.js';
import Ataque from './ataque.js';
import Nota from './nota.js';
import Dron from './dron.js';
export default class Rockero extends Enemigos {
  
  constructor(scene, listaAnim, a, x, y, f) {
    super(scene, listaAnim, x, y, f, 'rockero', 100); //escena, nuestro personaje, x, y, fisicas, tipo de enemigo, vida del enemigo
    this.listaAnim = listaAnim;
    this.flipX = false;
    this.fisicas = f;
    this.cd = 2000;
    this.cA = 0;
    if(!this.fisicas){
      this.ataque1 = new Ataque(this.scene, -1, 4, 0, 2, true, false, null,null, null); //menos prioritario       
      this.ataque2 = new Ataque(this.scene, -1, 0, 2, 1, false, true, null,null, null); //curacion 
      this.ataque3 = new Ataque(this.scene, -1, 15, 3, 0, false, false, null, null, null);
        this.ataque1.setVisible(false);
        this.ataque2.setVisible(false);
        this.ataque3.setVisible(false);
      this.listaAtaques = this.scene.add.group();
      this.listaAtaques.add(this.ataque1);
      this.listaAtaques.add(this.ataque2);
      this.listaAtaques.add(this.ataque3);
    }
  }
  
 

  preUpdate(t, dt) {
      super.preUpdate(t, dt);
      //lanzar notas
     
      
      if(this.fisicas){
        if(this.cA <= t){
            this.cA = (t + this.cd);
            new Nota(this.scene, this.listaAnim, this.x, 1000, 150);
        }

        //si colisiona con nuestro personaje
        if (this.scene.physics.overlap(this.listaAnim, this)) {
            this.scene.combatir('rockero');
            this.destroy();
        }
      }
  }

}