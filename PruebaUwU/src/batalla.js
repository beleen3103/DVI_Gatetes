import Mapache from './mapache.js';
import Npc from './npc.js';


export default class Batalla extends Phaser.Scene {

    constructor() {
        super({ key: 'batalla' });
        
    }


    create() {
        this.auxDT = 0;
        this.turn = true;
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.add.image(0, 0, 'vs').setOrigin(0).setScale(1);
        this.label = this.add.text(10,10,"");
        this.cursor = this.input.keyboard.createCursorKeys();
        this.mapache = new Mapache(this, 200, 300, false);
        this.npc = new Npc(this, this.mapache, 700, 280, false);
        this.npc1 = new Npc(this, this.mapache, 880, 280, false); //cambiar por un bucle
        this.listaMalos = this.add.group();
        this.listaMalos.add(this.npc);
        this.listaMalos.add(this.npc1); //cambiar por un bucle
    }

    update(t,dt){
        super.update(t,dt);
        
        if(this.turn){
            if (this.keyQ.isDown) { //Ppum pum punietaso
                this.npc.barra.decrease(10);
                this.listaMalos.children.get(0).damage(10);
                this.turn = false;
            }
            else if (this.keyW.isDown) {//curarse
                this.mapache.barra.increase(10);
                this.mapache.heal(10);
                this.turn = false;
            }
            else if (this.keyE.isDown) {
                this.listaMalos.children.each(malo => {
                    malo.damage(6);
                    malo.barra.decrease(6);
                });

                this.turn = false;
            }
            else if (this.keyR.isDown) {
                this.npc.barra.decrease(10);
                this.npc.damage(10);
                this.turn = false;
            }
            else if (this.cursor.right.isDown) {
                this.npc.barra.increase(10);
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
                this.listaMalos.children.each(malo => { //cada enemigo ataca
                        this.ataca = Phaser.Math.Between(0, 100);
                    if(this.ataca < 80) {
                        this.mapache.barra.decrease(4);
                        this.mapache.damage(4);
                    }
                    else{
                        this.label.text = "FALLO!"; //estaria guay indicar cual de los dos falla
                    }
                });                
            }
            
        }
        if(this.npc.barra.isDead() || this.mapache.barra.isDead()) { //ahora mismo solo comprueba que el npc al que podemos pegar esta vivo
            this.scene.resume('nivel1'); //vuelve a la escena del mapa aunque desde el principio, no se guarda el estado
            this.scene.stop();
        }
        
    }
}