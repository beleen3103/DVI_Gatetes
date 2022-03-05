import Mapache from './mapache.js';
import Npc from './npc.js';


export default class Batalla extends Phaser.Scene {

    constructor() {
        super({ key: 'batalla' });
        
    }


    create() {
        this.auxDT = 0;
        this.xp = 600;
        this.yp = 280;
        this.turn = true;
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.add.image(0, 0, 'vs').setOrigin(0).setScale(1);
        this.label = this.add.text(10,10,"");
        this.cursor = this.input.keyboard.createCursorKeys();
        this.mapache = new Mapache(this, 200, 280, false);
        this.listaMalos = this.add.group();
        this.listaMalos.maxSize = Phaser.Math.Between(0, 3);
        this.i = 0;
        while(!this.listaMalos.isFull()){ //random de 1 a 3 enemigos
            this.npc = new Npc(this, this.mapache, this.xp, this.xp, this.yp, false);
            this.listaMalos.add(this.npc);
            this.xp += 180;
        }
       
       // this.npc1 = new Npc(this, this.mapache, 880, 280, false); //cambiar por un bucle
        
       // this.listaMalos.add(this.npc);
       // this.listaMalos.add(this.npc1); //cambiar por un bucle
    }

    update(t,dt){
        super.update(t,dt);
        
        if(this.turn){
            if (this.keyQ.isDown) { //Ppum pum punietaso
                this.listaMalos.getFirstAlive().barra.decrease(10);
                this.listaMalos.getFirstAlive().damage(10);
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
                this.listaMalos.getFirstAlive().barra.decrease(10);
                this.npc.damage(10);
                this.turn = false;
            }
            this.auxDT = 0;
            while(this.listaMalos.countActive() > 0 && this.listaMalos.getFirstAlive().isDead()){ //desactiva los que estan muertos
                this.listaMalos.getFirstAlive().setActive(false).setVisible(false);
            }
        }
        else{
            this.auxDT += dt;
            this.label.text = "";
            if(this.auxDT >= 2000) {
                this.turn = true;
                this.listaMalos.children.each(malo => { //cada enemigo ataca
                    if(malo.active){ //si no esta muerto ya, ataca
                        this.ataca = Phaser.Math.Between(0, 100);
                        if(this.ataca < 80) {
                            this.mapache.barra.decrease(4);
                            this.mapache.damage(4);
                        }
                        else{
                            this.label.text = "FALLO!"; //estaria guay indicar cual de los dos falla
                        }
                    }
                });                
            }
            
        }
        if(this.mapache.barra.isDead() || this.listaMalos.countActive() === 0) { //ahora mismo solo comprueba que el npc al que podemos pegar esta vivo
            this.scene.resume('nivel1'); //vuelve a la escena del mapa aunque desde el principio, no se guarda el estado
            this.scene.stop();
        }
        
    }
}