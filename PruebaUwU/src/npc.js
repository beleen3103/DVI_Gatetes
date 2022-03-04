import Enemigos from './Enemigos.js';
export default class Npc extends Enemigos {
  
  constructor(scene, m, x, y, f) {
    super(scene, m, x, y, f, 'npc', 100); //escena, nuestro personaje, x, y, fisicas, tipo de enemigo, vida del enemigo
     
    this.flipX = false;
    this.speed = 100;
    this.xDirection = -1; //empezamos a la izq
    
  }
  

  preUpdate(t, dt) {
      super.preUpdate(t, dt);
      //movimiento automatico
      
      if(this.fisicas){
       // Esta mal y a medias, como Espanha
        if(this.body.position.x <= 500 || this.body.position.x >= 900) { //limites de movimiento
          this.xDirection *= -1;
          this.flipX = !this.flipX; //giros del personaje al andar
        }
        this.get
        this.body.setVelocityX(this.speed*this.xDirection); //se actualiza la posicion del objeto pa que colisione bien

        //si colisiona con nuestro personaje
        if (this.scene.physics.overlap(this.mapache, this)) {
            this.scene.pinchoPinchado();
            this.destroy();
        }
      }
  }

}