export default class Platform extends Phaser.GameObjects.Sprite {
  

  constructor(scene, player, x, y, collide, sprite) {
    super(scene, x, y, sprite);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    if(collide) this.scene.physics.add.collider(this, player);   
  }
}
