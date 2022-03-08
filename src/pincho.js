export default class Pincho extends Phaser.GameObjects.Sprite {


    constructor(scene, m, x, y) {
        super(scene, x, y, 'pincho');
        this.mapache = m;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.scene.physics.overlap(this.mapache, this)) {
            this.scene.pinchoPinchado();
            this.destroy();
        }
    }

}