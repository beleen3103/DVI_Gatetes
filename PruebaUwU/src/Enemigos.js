import Barra from './healthBar.js';

export default class Npc extends Phaser.GameObjects.Sprite {
  
  constructor(scene, m, x, y, f, npc, vida) {
    super(scene, x, y, npc);   
    this.mapache = m;
    this.vida = vida;
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
  }

}