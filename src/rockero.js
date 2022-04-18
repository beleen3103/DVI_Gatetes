import Enemigos from './Enemigos.js';
import Ataque from './ataque.js';
import Nota from './nota.js';
import Dron from './dron.js';
export default class Rockero extends Enemigos {
  
  constructor(scene, listaAnim, x, y, f) {
    super(scene, listaAnim, x, y, f, 'emo', 100); //escena, nuestro personaje, x, y, fisicas, tipo de enemigo, vida del enemigo
    this.listaAnim = listaAnim;
    this.flipX = false;
    this.fisicas = f;
    this.cd = 2000;
    this.cA = 0;
    if(!this.fisicas){
      this.ataque1 = new Ataque(this.scene, -1, 1, 0, 2, false, null,null, null); //menos prioritario       
      this.ataque2 = new Ataque(this.scene, 1, -10, 2, 1, false, null,null, null); //curacion 
      this.ataque3 = new Ataque(this.scene, -1, 15, 3, 0, false, null,null, null);
      this.listaAtaques = this.scene.add.group();
      this.listaAtaques.add(this.ataque1);
      this.listaAtaques.add(this.ataque2);
      this.listaAtaques.add(this.ataque3);
    }
  }
  
  advance(){
    this.listaAtaques.children.each(at => {
         at.advance();                   
    });
  }
  selectAttack(){
    this.ataque = null;
    if(this.ataque1.getCooldown() === 0) this.ataque = this.ataque1;
    if(this.ataque2.getCooldown() === 0) {
      if(this.ataque === null) this.ataque = this.ataque2;
      else if(this.ataque.getPriority() > this.ataque2.getPriority()) this.ataque = this.ataque2;
    }
    if(this.ataque3.getCooldown() === 0) {
      if(this.ataque === null) this.ataque = this.ataque3;
      else if(this.ataque.getPriority() > this.ataque3.getPriority()) this.ataque = this.ataque3;
    }


    this.ataque.resetCooldown();
    return this.ataque;
  }

  preUpdate(t, dt) {
      super.preUpdate(t, dt);
      //lanzar notas
     
      
      if(this.fisicas){
        if(this.cA <= t){
            this.cA = (t + this.cd);
            console.log('nota')
            new Nota(this.scene, this.listaAnim, 2160, 1000, 100);
        }

        //si colisiona con nuestro personaje
        if (this.scene.physics.overlap(this.listaAnim, this)) {
            this.scene.combatir();
            this.destroy();
        }
      }
  }

}