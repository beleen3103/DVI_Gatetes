import Platform from './platform.js';
import PlatformT from './platformT.js';
import Mapache from './mapache.js';
import Npc from './emo.js';
import Rock from './rockero.js';
import Gato from './gato.js';
import Animales from './Animales.js';
import Dialogo from "./dialogo.js";

export default class Callao extends Phaser.Scene {
    
    constructor() {
        super({ key: 'Callao' });
    }

    init(data){
        //posicion del animal
        this.x = data.x;
        this.y = data.y;

        //lista de animales que tenemos disponibles
        this.listaAnimales = this.add.group();

        for(let i=0; i<3; i++){

             if(eval("data.animal"+(i+1)) === "."){ //animal vacio, es decir, no tenemos 3 animales
                 this.animal= new Animales(this, null, null, null,'.', 0, null,null);
                 eval("this.animal"+(i+1)+"=this.animal");
             }
             else{
                //creamos el animal que sea
                let nombre = eval("data.animal"+(i+1));
                eval("this.animal = new " + nombre +"(this,data.x,1200,true)");   
                
                 //asignamos la vida del animal
                 let vidaAux = eval("data.animal"+(i+1)+"Vida");
                 this.animal.setVida(vidaAux);
                 this.animal.setDepth(100);
                 this.animal.barra.getBar().setDepth(100);
                 this.animal.label.setDepth(100);               
                 this.animal.barra.setHealth(vidaAux);

                 //si no es el animal que estabamos usando en la escena anterior, lo hacemos no visible
                 if(this.animal.getName() != data.actual) {
                    this.animal.setActive(false).setVisible(false); 
                    this.animal.barraVisible(false);
                    }
                 else this.player = this.animal;
                 
                 eval("this.animal"+(i+1)+"=this.animal");               
                 this.listaAnimales.add(eval("this.animal"+(i+1)));
             }
        }
        
        this.player.flipX = data.flip;
    }



    preload(){
        this.load.tilemapTiledJSON('mapa','assets/sprites/mapa.json');
        this.load.image('plataformas', 'assets/sprites/tiles.png');
    }
    
    create() {

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.add.image(0, 50, 'callaoB').setOrigin(0).setScale(1.1); // FONDO
        //this.player = new Gato(this, this.x, this.y, true); // Personaje
        this.player.setDepth(100);  // Personaje por delante de los objetos
        this.configureCamera(); // Camara que sigue al jugador
        this.keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);        
        this.keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
        this.feedback = this.add.text(310,200,"", { font: "30px Verdana"});
        this.feedback.setScrollFactor(0,0).setDepth(101);


        let toTuto = this.add.zone(0,300,10,600);
        this.physics.world.enable(toTuto);
        toTuto.body.setAllowGravity(false);
        this.physics.add.overlap(this.listaAnimales.getChildren(),toTuto,()=>{
            this.scene.pause();
            this.scene.start('GranVia', {x: 2900,y:490, numeroAnimales: this.listaAnimales.getLength(),animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, actual: this.player.getName(), flip:true});
        });

        
    }
    update(t, dt){
        this.c.startFollow(this.player);
        
        if(this.keyOne.isDown){
            if(this.player != this.animal1){ 
                if(this.animal1.vida > 0){
                    let auxX = this.player.getX();
                    let auxY = this.player.getY();
                    
                    this.player.body.enable=false; //quitamos el animal actual
                    this.player.setActive(false).setVisible(false); 
                    this.player.barraVisible(false);
                    
                    this.player = this.animal1; //cambiamos al nuevo
                    this.player.setPosition(auxX,auxY);
                    
                    this.player.setActive(true).setVisible(true); //hacemos visible el nuevo
                    this.player.body.enable=true;
                    this.player.barraVisible(true);
                }
                else {
                    this.feedback.text = "¡El " +this.animal1.getName()+ " no tiene vida!";
                    this.auxDT = 0;
                }
            }
        }
        if(this.keyTwo.isDown){ 
            if(this.listaAnimales.getLength() >= 2 && this.player != this.animal2){
                if(this.animal2.vida > 0){
                let auxX = this.player.getX();
                let auxY = this.player.getY();
                
                this.player.body.enable= false;
                this.player.setActive(false).setVisible(false);
                this.player.barraVisible(false);
                this.player = this.animal2;                
                this.player.setPosition(auxX,auxY);
                this.player.setActive(true).setVisible(true);
                this.player.body.enable=true;
                this.player.barraVisible(true);
                }
                else {
                    this.feedback.text = "¡El " +this.animal2.getName()+ " no tiene vida!";
                    this.auxDT = 0;
                }
            }
        }
        if(this.keyThree.isDown){ 
            if(this.listaAnimales.getLength() >= 3 && this.player != this.animal3){
                if(this.animal3.vida > 0){
                let auxX = this.player.getX();
                let auxY = this.player.getY();
                
                this.player.body.enable= false;
                this.player.setActive(false).setVisible(false);
                this.player.barraVisible(false);
                this.player = this.animal3;                
                this.player.setPosition(auxX,auxY);
                this.player.setActive(true).setVisible(true);
                this.player.body.enable=true;
                this.player.barraVisible(true);
                }
                else {
                    this.feedback.text = "¡El " +this.animal3.getName()+ " no tiene vida!";
                    this.auxDT = 0;
                }
            }
        }
        if(this.auxDT < 2000){
            this.auxDT+=dt;
        }
        else this.feedback.text = "";


    }
    configureCamera(){
        this.c = this.cameras.main;
        const lerpValue = 0.1
        this.c.setLerp(lerpValue,lerpValue);
        const xIni = 0, yIni = 0, xSize = 1100, ySize = 600;
        this.c.setBounds(xIni,yIni,xSize,ySize+100) //Tamaño de la camara (minimo-maximo)
        this.physics.world.setBounds(xIni,yIni,xSize,ySize,true,true,true,true) //Tamaño de la escena
        //this.c.startFollow(this.player);
    }
}