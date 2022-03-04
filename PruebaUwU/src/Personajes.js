import Barra from './healthBar.js';

export default class Personajes extends Phaser.GameObjects.Sprite {
  
  constructor(scene, x, y, f, name, vida) {
    super(scene, x, y, name);     
    this.maxVida = vida;
    this.vida = vida;
    this.name = name; //para saber que animal/enemigo es
    this.scene.add.existing(this); 

    this.fisicas = f;   
    if(this.fisicas){
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
    }
    else{
        this.label = this.scene.add.text(x+70, y+120, "");
        this.barra = new Barra(scene, x-40, y+120, this.vida);
        this.updateScore();
      }     
  }
  isDead(){
    return this.vida ===0;
  }
  damage(x) {
    if(this.vida - x < 0) this.vida = 0;
    else this.vida -= x;
    this.updateScore();
  }

  heal(x) {
    if(this.vida + x > this.maxVida) this.vida = this.maxVida;
    else this.vida += x;
    this.updateScore();
  }

  updateScore() {
    this.label.text = this.vida;
  }
  
  preUpdate(t, dt) {
      super.preUpdate(t, dt);
  }

}