import Personajes from './Personajes.js';

export default class Animales extends Personajes {

    constructor(scene, x, y, f, name, vida, speed, jumpSpeed) {
        super(scene, x, y, f, name, vida);
        this.flipX = true;
        this.move = false;
        
        if(this.fisicas){
            this.cursors = this.scene.input.keyboard.createCursorKeys();
            this.body.setSize(80,65,true);
            this.label = this.scene.add.text(10, 10, "");
        }
        this.speed = speed;
        this.jumpSpeed = jumpSpeed;
        
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('Anime1', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
      
    }

    //los getters y setters estan aqui y no en personajes porque belen ha estado probando lo de cambiar de animal
    getX(){
        return this.x;
    }
    setX(pos){
        this.x = pos;
    }
    getY(){
        return this.y;
    }
    setY(pos){
        this.y = pos;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if(this.fisicas){
            if (this.cursors.up.isDown && this.body.onFloor()) {
                this.body.setVelocityY(this.jumpSpeed);
            }
            if (this.cursors.left.isDown) {
                if (!this.move) {
                    this.play('andar');
                    this.move = true;
                }
                this.body.setVelocityX(-this.speed);
                if (this.flipX) {
                    this.flipX = false;
                }
            }
            else if (this.cursors.right.isDown) {
                if (!this.move) {
                    this.play('andar');
                    this.move = true;
                }
                this.body.setVelocityX(this.speed);
                if (!this.flipX) {
                    this.flipX = true;
                }
            }
            else {
                this.body.setVelocityX(0);
                this.move = false;
                this.stop();
            }
        }
    }



}