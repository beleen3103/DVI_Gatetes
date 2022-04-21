import Enemigos from './Enemigos.js';
import Ataque from './ataque.js';
export default class emo extends Enemigos {
  
  constructor(scene, listaAnim, xIni, xFin, y, f) {
    super(scene, listaAnim, xIni, y, f, 'emo', 100); //escena, nuestro personaje, x, y, fisicas, tipo de enemigo, vida del enemigo
    this.xIni = xIni;
    this.xFin = xFin;
    this.listaAnim = listaAnim;
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

  textoAtaque(index, target, varios){
    if(varios) return "¡El "+ this.getName() + " " + index + " ha golpeado a todos los animales!";
    else{
      if(target === this) return "El " + target.getName() + " " + index+ " se ha curado";
      else return "El "+ this.getName() + " " + index + " ha golpeado al " + target.getName();
    }
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
        if (this.scene.physics.overlap(this.listaAnim, this)) {
            this.scene.combatir('emo');
            this.destroy();
        }
      }
  }

}