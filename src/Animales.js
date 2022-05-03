import Personajes from './Personajes.js';
import Barra from './healthBar.js';
export default class Animales extends Personajes {

    constructor(scene, x, y, f, name, maxvida, speed, jumpSpeed) {
        super(scene, x, y, f, name, maxvida,60, 60, 50);
        this.flipX = true;
        this.move = false;
        this.parar = false;
        this.stuneado = false;
        
        if(this.fisicas){
            this.cursors = this.scene.input.keyboard.createCursorKeys();
            this.body.setSize(80, 65, true);
            this.body.offset.y = 80;
            if (this.name === 'Rata') {
                this.body.setSize(80, 40, true);
                this.body.offset.y = 100;
            }
            this.label = this.scene.add.text(160, 40, "");
            this.barra = new Barra(scene, 50, 40, this.vida);
            this.label.setScrollFactor(0,0).setDepth(100);
            this.barra.getBar().setScrollFactor(0,0).setDepth(100);
            super.updateScore();
        }
        this.speed = speed;
        this.jumpSpeed = jumpSpeed;
        
        
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      
    }

    barraVisible(visible){
        if(visible){
            this.label.setVisible(true);
            this.barra.getBar().setVisible(true);
        }
        else{
            this.label.setVisible(false);
            this.barra.getBar().setVisible(false);
        }
    }
    stun() {
        this.body.setVelocityY(900);
        this.body.setVelocityX(0);
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
    setVida(x){
        this.vida = x;       
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
                    //this.chain();
                    this.play('parar');
                    this.parar = true;
                }
            }
            super.updateScore();
            this.barra.draw();
        }
    }



}