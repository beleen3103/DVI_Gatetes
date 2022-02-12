
export default class Mapache extends Phaser.GameObjects.Sprite {


    constructor(scene, x, y) {
        super(scene, x, y, 'mapache');
        this.vida = 10;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.speed = 300;
        this.jumpSpeed = -600;
        this.label = this.scene.add.text(10, 10, "");
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.updateScore();
    }

    damage() {
        this.vida += 2;
        this.updateScore();
    }

    updateScore() {
        this.label.text = 'Vida: ' + this.vida;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.cursors.up.isDown && this.body.onFloor()) {
            this.body.setVelocityY(this.jumpSpeed);
        }
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
            if (this.flipX) {
                this.flipX = false;
            }
            if(this.body.onFloor())
                this.body.setVelocityY(-50);
        }
        else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
            if (!this.flipX) {
                this.flipX = true;
            }
            if (this.body.onFloor())
                this.body.setVelocityY(-50);
        }
        else {
            this.body.setVelocityX(0);
        }
    }



}
