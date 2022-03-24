import Mapache from './mapache.js';
import Npc from './npc.js';
import Ataque from './ataque.js';
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
        
        
        
        this.fallo = this.add.text(400,70,"", { font: "60px Verdana"});
        this.mapache = new Mapache(this, 200, 300, false);
        this.auxDT = 0;
        this.turn = 0;
        //this.seleccion = 0;

        let xM = this.mapache.getX();
        let yM = this.mapache.getY();
        //cuando tengamos mas animales en batalla esto va a fallar
        this.listaAtaques = this.add.group();
        this.mapache.ataque1.setInteractive();
        this.listaAtaques.add(this.mapache.ataque1);
        this.mapache.ataque2.setInteractive();
        this.listaAtaques.add(this.mapache.ataque2);
        this.mapache.ataque3.setInteractive();
        this.listaAtaques.add(this.mapache.ataque3);

        this.listaMalos = this.add.group();
        this.listaMalos.maxSize = Phaser.Math.Between(1, 3);
        let xNpc = 600;
        const yNpc = 250;
        while(!this.listaMalos.isFull()){ //random de 1 a 3 enemigos
            this.npc = new Npc(this, this.mapache, xNpc, xNpc, yNpc, false);
            //this.npc.setInteractive();
            this.listaMalos.add(this.npc);
            xNpc += 150;
        }
       
       
    }
    update(t,dt){
        super.update(t,dt);

        if(this.turn === 0){
            this.click = true;
            if(this.pointer.leftButtonDown()) { //comprobamos qué ataque es
                this.a = null;
                this.listaAtaques.children.each(ataque=>{
                    this.i = this.pointer.downX;
                    this.j = this.pointer.downY;
                    if(this.i >= ataque.x-40 && this.i <= ataque.x+40 &&
                        this.j >= ataque.y-40 && this.j <= ataque.y+40) {
                        this.a = ataque; //nos quedamos con ese ataque
                    }

                });
                if(this.a != null){
                    if(this.a.getTarget() === 1 && !this.a.esBarrido()){
                        if(this.click){
                        this.turn = 1;
                        this.click = false;   
                        
                        }                   
                    }
                    else if(this.a.getTarget() != 1){//curacion
                        if(this.click){
                            this.a.attack(this.mapache);
                            this.turn = 2;
                            this.click = false;
                        }
                    }
                    else if(this.a.getTarget() === 1 && this.a.esBarrido()){ //ataca a todos
                        if(this.click){
                            this.a.attack(this.listaMalos);
                            this.turn = 2;
                            this.click = false;
                        }
                    }
                    this.auxDT = 0;
            }
            }
        }
        else if(this.turn === 1){ //seleccion de enemigo si es necesario
            this.click = true;
            this.listaMalos.children.each(malo => { //se pueden clickar enemigos
                malo.setInteractive();
            });  
                this.listaMalos.children.each(malo => {
                    if(!malo.isDead()){
                        malo.on('pointerdown', () => {
                            if(this.click){
                                this.a.attack(malo);
                                this.turn = 2;
                                this.click = false;
                                this.listaMalos.children.each(malo1 => { //ya no se pueden clickar
                                    malo1.disableInteractive();
                                }); 
                            }
                        });
                    }
                });
            
        }
        
        else{
            this.auxDT += dt;
            this.fallo.text = "";
            if(this.auxDT >= 2000) {
                this.turn = 0;
                this.listaMalos.children.each(malo => { //cada enemigo ataca
                    if(malo.active){ //si no esta muerto ya, ataca
                        //primero actualizamos cooldown
                        malo.advance();
                        this.ataqueMalo = malo.selectAttack();
                        this.ataca = Phaser.Math.Between(0, 100);
                        if(this.ataca < 80) {
                            if(this.ataqueMalo.getTarget() === 1) {
                                if(!this.ataqueMalo.esBarrido()) this.target = malo;
                                else this.target = this.listaMalos;
                            }
                            else{
                                /*if(!this.ataqueMalo().esBarrido()) this.target = //todos los animales;
                                else this.target = randomAnimal (uno de los que tengamos);*/
                                this.target = this.mapache;
                            }
                            this.ataqueMalo.attack(this.target);
                        }
                        else{
                            this.fallo.text = "FALLO"; //estaria guay indicar cual de los dos falla
                        }
                    }
                });                
            }
        }
        while(this.listaMalos.countActive() > 0 && this.listaMalos.getFirstAlive().isDead()){ //desactiva los que estan muertos
            this.listaMalos.getFirstAlive().label.setVisible(false);
            this.listaMalos.getFirstAlive().barra.getBar().setVisible(false);
            this.listaMalos.getFirstAlive().setActive(false).setVisible(false);
        }
        if(this.mapache.barra.isDead() || this.listaMalos.countActive() === 0) { //ahora mismo solo comprueba que el npc al que podemos pegar esta vivo
            this.scene.resume('tutorial'); //vuelve a la escena del mapa aunque desde el principio, no se guarda el estado
            this.scene.stop();
        }
    }
}