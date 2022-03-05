import Mapache from './mapache.js';
import Npc from './npc.js';
import Platform from './platform.js';


export default class Batalla extends Phaser.Scene {

    constructor() {
        super({ key: 'batalla' });
        
    }
    create() {
        this.add.image(0, 0, 'vs').setOrigin(0).setScale(1);

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.pointer = this.input.activePointer;
        
        
        

        this.label = this.add.text(10,10,"");
        this.mapache = new Mapache(this, 200, 250, false);
        this.auxDT = 0;
        this.turn = true;

        let xM = this.mapache.getX();
        let yM = this.mapache.getY();
        this.mordisco = this.add.sprite(xM-50,yM+150,'mordisco').setInteractive();
        this.curacion = this.add.sprite(xM+50,yM+150,'curacion').setInteractive();

        this.listaMalos = this.add.group();
        this.listaMalos.maxSize = Phaser.Math.Between(1, 3);
        let xNpc = 600;
        const yNpc = 250;
        while(!this.listaMalos.isFull()){ //random de 1 a 3 enemigos
            this.listaMalos.add(new Npc(this, this.mapache, xNpc, xNpc, yNpc, false));
            xNpc += 150;
        }
       
       // this.npc1 = new Npc(this, this.mapache, 880, 280, false); //cambiar por un bucle
        
       // this.listaMalos.add(this.npc);
       // this.listaMalos.add(this.npc1); //cambiar por un bucle
    }

    update(t,dt){
        super.update(t,dt);
        
        if(this.turn){
            this.click = true;
            this.mordisco.on('pointerdown', () =>{
                if(this.click){
                    this.listaMalos.getFirstAlive().barra.decrease(10);
                    this.listaMalos.getFirstAlive().damage(10);
                    this.turn = false;
                    this.click = false;
                }
            });
            if (this.keyQ.isDown) { //Ppum pum punietaso
                this.listaMalos.getFirstAlive().barra.decrease(10);
                this.listaMalos.getFirstAlive().damage(10);
                this.turn = false;
            }
            this.curacion.on('pointerdown', () =>{
                if(this.click){
                    this.mapache.barra.increase(10);
                    this.mapache.heal(10);
                    this.turn = false;
                    this.click = false;
                }
            });
            if (this.keyW.isDown) {//curarse
                this.mapache.barra.increase(10);
                this.mapache.heal(10);
                this.turn = false;
            }
            if (this.keyE.isDown) {
                this.listaMalos.children.each(malo => {
                    malo.damage(6);
                    malo.barra.decrease(6);
                });

                this.turn = false;
            }
            if (this.keyR.isDown) {
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