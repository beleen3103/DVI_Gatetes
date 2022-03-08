import Personajes from './Personajes.js';
import Barra from './healthBar.js';
export default class Animales extends Personajes {

    constructor(scene, x, y, f, name, vida, speed, jumpSpeed) {
        super(scene, x, y, f, name, vida);
        this.flipX = true;
        this.move = false;
        this.parar = false;
        
        if(this.fisicas){
            this.cursors = this.scene.input.keyboard.createCursorKeys();
            this.body.setSize(80,65,true);
            this.label = this.scene.add.text(10, 10, "");
        }
        else{
            this.label = this.scene.add.text(x+70, y+60, "");
            this.barra = new Barra(scene, x-40, y+60, this.vida);
            this.updateScore();
        }
        this.speed = speed;
        this.jumpSpeed = jumpSpeed;
        
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('Anime1', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'parar',
            frames: this.anims.generateFrameNumbers('Anime1', { start: 5, end: 10 }),
            frameRate: 15,
            repeat: 0
        })
        this.anims.create({
            key: 'levantarse',
            frames: this.anims.generateFrameNumbers('Anime1', { start: 10, end: 5 }),
            frameRate: 20,
            repeat: 0
        })

        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      
    }

    updateScore() {
        this.label.text = this.vida;
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
            if ((this.keyW.isDown || this.keySpace.isDown) && this.body.onFloor()) {
                this.body.setVelocityY(this.jumpSpeed);
            }
            if (this.keyA.isDown) {
                this.parar = false;
                if (!this.move) {
                    this.play('levantarse');
                    this.chain('andar');
                    this.move = true;
                }
                this.body.setVelocityX(-this.speed);
                if (this.flipX) {
                    this.flipX = false;
                }
            }
            else if (this.keyD.isDown) {
                this.parar = false;
                if (!this.move) {
                    this.play('levantarse');
                    this.chain('andar');
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
                if (!this.parar) {
                    this.chain();
                    this.play('parar');
                    this.parar = true;
                }
            }
        }
    }



}