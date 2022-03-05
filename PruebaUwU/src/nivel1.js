import Platform from './platform.js';
import Mapache from './mapache.js';
import Npc from './npc.js';
import Pincho from './pincho.js';
import Queso from './queso.js';
//import gato from './gato.js';

export default class Nivel1 extends Phaser.Scene {

    constructor() {
        super({ key: 'nivel1' });
    }

    //Belén: todo lo comentado son cosas que he probado para cambiar de personajes, aun no funciona
    create() {
       // this.mapache = new Mapache(this, 200, 300, true); //
       // this.gato = new gato(this, 200, 300, true)//
       // this.gato.setActive(false).setVisible(false); //
       // this.player = this.mapache; //
        this.player = new Mapache(this, 200, 300, true);
        new Platform(this, this.player, 500, 350);
        new Platform(this, this.player, 850, 200);
        new Queso(this, this.player, 850, 120);
        new Npc(this, this.player, 900, 500, 430, true);
       // this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        //new Pincho(this, this.mapache, 500, 450);
    }
   /* update(t, dt){ //

        if (this.keyC.isDown){ //cambiar personaje
            if(this.player.name == 'mapache') {
                this.mapache.setActive(false).setVisible(false);
                this.gato.setX(this.player.getX());
                this.gato.setY(this.player.getY());
                this.gato.setActive(true).setVisible(true);
                this.player = this.gato;
            }
           // if(this.player.name == 'gato') this.player = new Mapache(this, this.player.getX(), this.player.getY(), true);
        }

    }*/
    nomnomQuesito(){
        this.scene.start('hub');
        this.scene.pause();
    }

    pinchoPinchado() {
        this.scene.launch('batalla');
        this.scene.pause();
    }

}