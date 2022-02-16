
export default class Mapache extends Phaser.GameObjects.Sprite {


    constructor(scene, x, y, f) {
        super(scene, x, y, 'mapache');
        this.flipX = true;
        this.maxVida = 100;
        this.vida = 100;
        this.fisicas = f;
        this.scene.add.existing(this);
        if(this.fisicas){
            this.cursors = this.scene.input.keyboard.createCursorKeys();
            this.scene.physics.add.existing(this);
            this.body.setCollideWorldBounds();
            this.label = this.scene.add.text(10, 10, "");
        }
        else this.label = this.scene.add.text(270, 400, "");
        this.speed = 300;
        this.jumpSpeed = -600;
        
        
        this.updateScore();
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
        if(this.fisicas){
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



}
