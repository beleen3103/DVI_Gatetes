export default class Pincho extends Phaser.GameObjects.Sprite {


    constructor(scene, mapache, x, y) {
        super(scene, x, y, 'pincho');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
    }

    preUpdate() {
        super.preUpdate();
        if (this.scene.physics.overlap(this.scene.mapache, this)) {
            this.scene.pinchoPinchado();
        }
    }

}