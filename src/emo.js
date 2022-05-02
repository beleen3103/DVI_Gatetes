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
      this.ataque1 = new Ataque(this.scene, -1, 5, 0, 2, true, false, null,null, null); //menos prioritario       
      this.ataque2 = new Ataque(this.scene, 1, -10, 2, 1, true, false, null,null, null); //curacion 
      this.ataque3 = new Ataque(this.scene, -1, 15, 3, 0, false, false, null,null, null);
        this.ataque1.setVisible(false);
        this.ataque2.setVisible(false);
        this.ataque3.setVisible(false);
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