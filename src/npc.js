import Enemigos from './Enemigos.js';
import Ataque from './ataque.js';
export default class Npc extends Enemigos {
  
  constructor(scene, m, xIni, xFin, y, f) {
    super(scene, m, xIni, y, f, 'emo', 100); //escena, nuestro personaje, x, y, fisicas, tipo de enemigo, vida del enemigo
    this.xIni = xIni;
    this.xFin = xFin;
    this.flipX = false;
    this.speed = 100;
    this.fisicas = f;
    this.xDirection = -1; //empezamos a la izq
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
      //movimiento automatico
      
      if(this.fisicas){
       // Esta mal y a medias, como Espanha
        if(this.body.position.x <= this.xFin || this.body.position.x >= this.xIni) { //limites de movimiento
          this.xDirection *= -1;
          this.flipX = !this.flipX; //giros del personaje al andar
        }
        this.body.setVelocityX(this.speed*this.xDirection); //se actualiza la posicion del objeto pa que colisione bien

        //si colisiona con nuestro personaje
        if (this.scene.physics.overlap(this.mapache, this)) {
            this.scene.combatir();
            this.destroy();
        }
      }
  }

}