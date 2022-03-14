import Mapache from './mapache.js';
import Npc from './npc.js';

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
        //this.ataque1 = this.add.sprite(xM-50,yM+120,'mordisco').setInteractive();
        //this.ataque2 = this.add.sprite(xM+50,yM+120,'curacion').setInteractive();
        //this.ataque3 = this.add.sprite(xM+150, yM+120, 'cola').setInteractive();

        this.listaMalos = this.add.group();
        this.listaMalos.maxSize = Phaser.Math.Between(1, 3);
        let xNpc = 600;
        const yNpc = 250;
        while(!this.listaMalos.isFull()){ //random de 1 a 3 enemigos
            this.npc = new Npc(this, this.mapache, xNpc, xNpc, yNpc, false);
            this.npc.setInteractive();
            this.listaMalos.add(this.npc);
            xNpc += 150;
        }
       
       
    }
    update(t,dt){
        super.update(t,dt);
        
        if(this.turn != 2){
            this.click = true;
            this.listaAtaques.children.each(ataque =>{
                ataque.on('pointerdown', () =>{
                    //this.click = false;
                    //en el caso de que ataque a 1 enemigo
                    if(ataque.getTarget() === 1 && !ataque.esBarrido()){
                        //this.click = true;
                        /*this.listaMalos.children.each(malo => {
                            if(!malo.isDead()){
                                if(this.click){
                                    malo.on('pointerdown', () => {                               
                                        this.turn = 1;  
                                        ataque.attack(malo);
                                    });
                                    this.click = false;
                                }
                            }
                        });     */
                        this.turn = 1;                         
                    }
                    else if(ataque.getTarget() != 1){//curacion
                        if(this.click){
                            ataque.attack(this.mapache);
                            this.turn = 2;
                            this.click = false;
                        }
                    }
                    else if(ataque.getTarget() === 1 && ataque.esBarrido()){ //ataca a todos
                        if(this.click){
                            ataque.attack(this.listaMalos);
                            this.turn = 2;
                            this.click = false;
                        }
                    }
                });
                if(this.turn === 1){
                    this.click = true;
                   
                        this.listaMalos.children.each(malo => {
                            if(!malo.isDead()){
                                malo.on('pointerdown', () => {
                                    if(this.click){
                                        ataque.attack(malo);
                                        this.turn = 2;
                                        this.click = false;
                                    }
                                });
                            }
                        });
                    
                }
            });
            
            this.auxDT = 0;
        }
        
        else{
            this.auxDT += dt;
            this.fallo.text = "";
            if(this.auxDT >= 2000) {
                this.turn = 0;
                this.listaMalos.children.each(malo => { //cada enemigo ataca
                    if(malo.active){ //si no esta muerto ya, ataca
                        this.ataca = Phaser.Math.Between(0, 100);
                        if(this.ataca < 80) {
                            this.mapache.barra.decrease(4);
                            this.mapache.damage(4);
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
       /* if(this.turn === 0){
            this.click = true;
            this.mordisco.on('pointerdown', () =>{
                if(this.click){
                    this.turn = 1;
                    this.ataque = 1;
                    this.click = false;
                    this.click = true;
                    if(this.ataque === 1){
                        this.listaMalos.children.each(malo => {
                            if(!malo.isDead()){
                                malo.on('pointerdown', () => {
                                    if(this.click){
                                        malo.barra.decrease(30);
                                        malo.damage(30);
                                        this.turn = 2;
                                        this.click = false;
                                    }
                                });
                            }
                        });
                    }
                }
            });
            this.curacion.on('pointerdown', () =>{
                if(this.click){
                    this.mapache.barra.increase(10);
                    this.mapache.heal(10);
                    this.turn = 2;
                    this.click = false;
                }
            });
            this.cola.on('pointerdown', () =>{
                if(this.click){
                    this.listaMalos.children.each(malo => {
                        malo.damage(15);
                        malo.barra.decrease(15);
                    });
                    this.turn = 2;
                    this.click = false;
                }
            });
            
            this.auxDT = 0;
            
        }
        else if(this.turn === 1){
            this.click = true;
            if(this.ataque === 1){
                this.listaMalos.children.each(malo => {
                    if(!malo.isDead()){
                        malo.on('pointerdown', () => {
                            if(this.click){
                                malo.barra.decrease(30);
                                malo.damage(30);
                                this.turn = 2;
                                this.click = false;
                            }
                        });
                    }
                });
            }
        }
        else{
            this.auxDT += dt;
            this.fallo.text = "";
            if(this.auxDT >= 2000) {
                this.turn = 0;
                this.listaMalos.children.each(malo => { //cada enemigo ataca
                    if(malo.active){ //si no esta muerto ya, ataca
                        this.ataca = Phaser.Math.Between(0, 100);
                        if(this.ataca < 80) {
                            this.mapache.barra.decrease(4);
                            this.mapache.damage(4);
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
        */
    }
}