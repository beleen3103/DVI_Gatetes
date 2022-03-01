import Mapache from './mapache.js';
import Npc from './npc.js';
import Barra from './healthBar.js';

export default class Batalla extends Phaser.Scene {

    constructor() {
        super({ key: 'batalla' });
        
    }


    create() {
        this.auxDT = 0;
        this.turn = true;
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.add.image(0, 0, 'vs').setOrigin(0).setScale(1);
        this.label = this.add.text(10,10,"");
        this.cursor = this.input.keyboard.createCursorKeys();
        this.mapache = new Mapache(this, 200, 300, false);
        this.npc = new Npc(this, this.mapache, 700, 280, false);
        this.barra = new Barra(this, 670, 400, this.npc.vida);
        this.barraM = new Barra(this, 150, 400, this.mapache.vida);
    }

    update(t,dt){
        super.update(t,dt);
        if(this.turn){
            if (this.keyQ.isDown) {
                this.barra.decrease(10);
                this.npc.damage(10);
                this.turn = false;
            }
            else if (this.cursor.right.isDown) {
                this.barra.increase(10);
                this.npc.heal(10);
                this.turn = false;
            }
            this.auxDT = 0;     
        }
        else{
            this.auxDT += dt;
            this.label.text = "";
            if(this.auxDT >= 2000) {
                this.turn = true;
                this.ataca = Phaser.Math.Between(0, 100);
                if(this.ataca < 80) {
                    this.barraM.decrease(9);
                    this.mapache.damage(9);
                }
                else{
                    this.label.text = "FALLO!";
                }
            }
            
        }
        if(this.barra.isDead()) {
            this.scene.resume('hub'); //vuelve a la escena del mapa aunque desde el principio, no se guarda el estado
            this.scene.stop();
        }
    }
}