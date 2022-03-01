export default class PuertaPlataformeo extends Phaser.GameObjects.Sprite {


    constructor(scene, m, x, y) {
        super(scene, x, y, 'puertaPlataformeo');
        this.mapache = m;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.body.setSize(80,150,true);
    }

    preUpdate() {
        super.preUpdate();
        if (this.scene.physics.overlap(this.mapache, this)) {
            this.scene.overlapPlataformeo();
        }
    }

}