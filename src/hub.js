//Miquel: Crear la escena Hub
import Platform from './platform.js';
import Mapache from './mapache.js';
import Npc from './emo.js';
import Pincho from './pincho.js';
import Queso from './queso.js';
import PuertaCombate from './puertaCombate.js';
import PuertaPlataformeo from './puertaPlataformeo.js';
import Dialogo from "./dialogo.js";

export default class Hub extends Phaser.Scene {

    constructor() {
        super({ key: 'hub' });
    }


    create() {
        this.add.text(440,70,"HUB", { font: "60px Verdana"});
        this.add.text(230,150,"Dirígete hacia un lado u otro para probar diferentes funcionalidades", { font: "16px Verdana"});
        this.add.text(120,250,"Combate", { font: "32px Verdana"});
        this.add.text(700,250,"Plataformeo", { font: "32px Verdana"});

        //var puertaCombate = this.add.graphics();
        //puertaCombate.fillStyle(0xff6666,1);
        //puertaCombate.fillRect(150,350,80,150);
        
        //var puertaPlataformeo = this.add.graphics();
        //puertaPlataformeo.fillStyle(0x66c2ff,1);
        //puertaPlataformeo.fillRect(760,350,80,150);
        

        this.mapache = new Mapache(this, 500, 400, true);

        this.puertaCombate = new PuertaCombate(this,this.mapache,190,425);
        this.puertaPlataformeo = new PuertaPlataformeo(this,this.mapache,800,425);
        this.mapache.setDepth(1);

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.cursor = this.input.keyboard.createCursorKeys();

        this.textoPulsarE = this.add.text(470,180,"E (Entrar)", { font: "16px Verdana"});

        //new Platform(this, this.mapache, 500, 350);
        //new Platform(this, this.mapache, 850, 200);
        //new Queso(this, this.mapache, 800, 400);
        //new Npc(this, this.mapache, 900, 430, true);
        //new Pincho(this, this.mapache, 500, 450);

        
    }

    overlapCombate(){
        if(this.keyE.isDown){
            this.scene.launch('dialogo');
        }
    }

    overlapPlataformeo(){
        if(this.keyE.isDown){
            this.scene.start('tutorial');
            this.scene.pause();
        }
    }


}