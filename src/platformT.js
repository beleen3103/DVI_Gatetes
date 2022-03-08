export default class PlatformT extends Phaser.GameObjects.Sprite {
   constructor(scene, mapache, x, y) {
    super(scene, x, y, 'platformT');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, mapache);
    
  }
  /*update(){
    if(this.mapache.body.y < this.body.y) this.body.enable = true;
    else this.body.enable = false;
  }*/
}
