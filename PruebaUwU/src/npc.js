export default class Npc extends Phaser.GameObjects.Sprite {
  
  constructor(scene, mapache, x, y, f) {
    super(scene, x, y, 'npc');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.body.x = x;
    this.fisicas = f;
    this.flipX = false;
    this.speed = 2;
    this.maxMovement = 5;
    this.xDirection = -1; //empezamos a la izq
  }
  
  preUpdate() {
      super.preUpdate();
      //movimiento automatico
      if(this.fisicas){
        if(this.body.x === 500 || this.body.x === 1000) { //limites de movimiento
          this.xDirection *= -1;
          this.flipX = (this.body.x === 500 ? true : false); //giros del personaje al andar
        }
        this.x += this.xDirection * this.speed; //se mueve el sprite
        this.body.x = this.x; //se actualiza la posicion del objeto pa que colisione bien

        //si colisiona con nuestro personaje
        if (this.scene.physics.overlap(this.scene.mapache, this)) {
            this.scene.pinchoPinchado();
        }
      }
  }

}