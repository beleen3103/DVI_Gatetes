import Mapache from './mapache.js';
import Npc from './npc.js';
import Barra from './healthBar.js';

export default class Batalla extends Phaser.Scene {

    constructor() {
        super({ key: 'batalla' });
        
    }


    create() {
        this.add.image(0, 0, 'vs').setOrigin(0).setScale(1);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.mapache = new Mapache(this, 200, 300, false);
        this.npc = new Npc(this, this.mapache, 700, 280, false);
        this.barra = new Barra(this, 670, 400, this.npc.vida);
    }

    update(t,dt){
        super.update(t,dt);
        if (this.cursor.left.isDown) {
            this.barra.decrease(1);
            this.npc.damage(1);
        }
        else if (this.cursor.right.isDown) {
            this.barra.increase(1);
            this.npc.heal(1);
        }
        if(this.barra.isDead()) {
            this.scene.resume('nivel1'); //vuelve a la escena del mapa aunque desde el principio, no se guarda el estado
            this.scene.stop();
        }
    }
}