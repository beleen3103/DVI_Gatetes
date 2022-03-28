export default class Basura extends Phaser.GameObjects.Sprite {
   constructor(scene, listaAnim, x, y) {
    super(scene, x, y, 'basura');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, listaAnim);
    this.body.setSize(150, 90, true);
  }
}
