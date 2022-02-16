import Mapache from './mapache.js';
import Npc from './npc.js';
import Barra from './healthBar.js';

export default class Batalla extends Phaser.Scene {

    constructor() {
        super({ key: 'batalla' });
        
    }


    create() {
        this.cursor = this.input.keyboard.createCursorKeys();
        this.mapache = new Mapache(this, 200, 300, false);
        this.npc = new Npc(this, this.mapache, 700, 280, false);
        this.barra = new Barra(this, 150, 400, this.mapache.vida);
    }

    update(t,dt){
        super.update(t,dt);
        if (this.cursor.left.isDown) {
            this.barra.decrease(1);
            this.mapache.damage(1);
        }
        else if (this.cursor.right.isDown) {
            this.barra.increase(1);
            this.mapache.heal(1);
        }

    }
}