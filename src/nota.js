export default class Nota extends Phaser.GameObjects.Sprite {


    constructor(scene, listaAnim, x, y, c) {
        super(scene, x, y, 'zarpazo');
        this.listaAnim = listaAnim;
        this.cooldown = c;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        this.scene.physics.moveTo(this, this.x, 0, 240);
        this.cooldown--;

        if(this.cooldown <= 0){
            this.destroy();
        }
        else{
            if (this.scene.physics.overlap(this.listaAnim, this)) {
                //this.listaAnim.setVelocityY(-10);
                this.destroy();
            }

        }

    }

}