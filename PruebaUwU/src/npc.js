import Barra from './healthBar.js';

export default class Npc extends Phaser.GameObjects.Sprite {
  
  constructor(scene, m, x, y, f) {
    super(scene, x, y, 'npc');
    this.vida = 100;
    this.mapache = m;
    this.scene.add.existing(this);   
    this.fisicas = f;
    if(this.fisicas){
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds();
    }
    else {
      this.label = this.scene.add.text(x+70, y+120, "");
      this.barra = new Barra(scene, x-40, y+120, this.vida);
      this.updateScore();
    }
    this.flipX = false;
    this.speed = 100;
    this.xDirection = -1; //empezamos a la izq
    
  }

  damage(x) {
    if(this.vida - x < 0) this.vida = 0;
    else this.vida -= x;
    this.updateScore();
  }

  heal(x) {
    if(this.vida + x > 100) this.vida = 100;
    else this.vida += x;
    this.updateScore();
  }

  updateScore() {
    this.label.text = this.vida;
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