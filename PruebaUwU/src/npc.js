import Enemigos from './Enemigos.js';
export default class Npc extends Enemigos {
  
  constructor(scene, m, xIni, xFin, y, f) {
    super(scene, m, xIni, y, f, 'emo', 100); //escena, nuestro personaje, x, y, fisicas, tipo de enemigo, vida del enemigo
    this.xIni = xIni;
    this.xFin = xFin;
    this.flipX = false;
    this.speed = 100;
    this.xDirection = -1; //empezamos a la izq
    
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