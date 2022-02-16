export default class Queso extends Phaser.GameObjects.Sprite {


    constructor(scene, m, x, y) {
        super(scene, x, y, 'queso');
        this.mapache = m;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
    }

    preUpdate() {
        super.preUpdate();
        if (this.scene.physics.overlap(this.mapache, this)) {
            this.scene.nomnomQuesito();
        }
    }

}