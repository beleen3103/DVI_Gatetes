import Basura from './basura.js';
import Mapache from './mapache.js';
import Gato from './gato.js';
import Npc from './emo.js';
import Animales from './Animales.js';

export default class Tutorial extends Phaser.Scene {
    
    constructor() {
        super({ key: 'tutorial' });
        
    }
    preload(){
        this.load.image('background', 'assets/background/fondo.png');
        this.load.audio('DVI_01', 'audio/DVI_01.ogg'); //Precargar el audio
        this.load.audio('DVI_02', 'audio/DVI_02.ogg'); //Precargar el audio
        this.load.image('suelo','assets/background/suelo.png');
    }

    init(data){
        //posicion del animal
        this.x = data.x
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
                eval("this.animal = new " + nombre +"(this,data.x,data.y,true)");   
                
                 //asignamos la vida del animal
                 let vidaAux = eval("data.animal"+(i+1)+"Vida");
                 this.animal.setVida(vidaAux);
                 this.animal.setDepth(100);
                 this.animal.barra.getBar().setDepth(100);
                 this.animal.label.setDepth(100);

                 //si no es el animal que estabamos usando en la escena anterior, lo hacemos no visible
                 if(this.animal.getName() != data.actual) this.animal.setActive(false).setVisible(false);
                 else this.player = this.animal;
                 
                 eval("this.animal"+(i+1)+"=this.animal");               
                 this.listaAnimales.add(eval("this.animal"+(i+1)));
             }
        }
        
    }

    create() {
        this.add.image(0,0,'background').setOrigin(0);
        this.add.image(0,500,'suelo').setOrigin(0);
        this.musica1 = this.sound.add('DVI_01');
        this.musica2 = this.sound.add('DVI_02');
        this.musica2.play({loop:true, volume:0.3});
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); 
        this.keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);        
        this.keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        
        this.c = this.cameras.main;
        const lerpValue = 0.1
        this.c.setLerp(lerpValue,lerpValue);
        const xIni = 0, yIni = 0, xSize = 2000, ySize = 500;
        this.c.setBounds(xIni,yIni,xSize,ySize+100) //Tamaño de la camara (minimo-maximo)
        this.physics.world.setBounds(xIni,yIni,xSize,ySize,true,true,true,true) //Tamaño de la escena

        this.createEnemies();
        this.createPlatforms();
        this.tutorialText();

        let fin = this.add.zone(1950,0,100,1000);
        this.physics.world.enable(fin);
        fin.body.setAllowGravity(false);
        this.physics.add.overlap(this.listaAnimales.getChildren(),fin,()=>{
            this.scene.pause();
            this.scene.start('nivel1', {x:100, y:this.player.getY(), numeroAnimales: this.listaAnimales.getLength(),animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, actual: this.player.getName()});
        });
        
        this.c.startFollow(this.player);


        //ESTO EN TODAS LAS ESCENAS
        let auxthis = this;
        this.events.on('resume',function(esc,data){
            //si ha perdido, fin del juego
            if(data.losed){}
            else{//sino, actualizamos vida
                for(let i=0; i<3; i++){
                    if(eval("auxthis.animal"+(i+1)+".getName()") != "."){ //si hay un animal, le asignamos la vida que le queda
                        let auxVida = eval("data.animal"+(i+1)+"Vida");
                        eval("auxthis.animal"+(i+1)+".setVida(auxVida)");
                    }
                }
            }
       });
    }
    createEnemies(){
        new Npc(this, this.listaAnimales.getChildren(), 1500, 940, 430, true);
    }
    createPlatforms(){
        new Basura(this, this.listaAnimales.getChildren(), 600, 450);
    }
    
    tutorialText(){
        //this.add.rectangle(1000,550,2000,100,0x00ff00);
        let elli = this.add.ellipse(140,220,200,80,0x32A8A3);
        elli.setStrokeStyle(2,0x2B908C);
        let fle = this.add.text(50,200,"Utiliza A D \nde direccion para mover", { font: "15px Verdana", align: "center"});
        this.container = this.add.container(0,0,[elli,fle]);

        let cambio1 = this.add.zone(300,0,10,1000);
        this.physics.world.enable(cambio1);
        cambio1.body.setAllowGravity(false);
        this.physics.add.overlap(this.listaAnimales.getChildren(),cambio1,()=>{
            elli.setPosition(500,220);
            fle.setText("Utiliza el espacio o W\npara saltar");
            fle.setPosition(420,200);
            cambio1.destroy();
        })
        let cambio2 = this.add.zone(650,0,10,1000);
        this.physics.world.enable(cambio2);
        cambio2.body.setAllowGravity(false);
        this.physics.add.overlap(this.listaAnimales.getChildren(),cambio2,()=>{
            this.container.destroy();
            cambio2.destroy();
        })
    }
    
    update(t,dt){
        this.c.startFollow(this.player); //para que siga a los nuevos animales cuando cambiamos
        if(Phaser.Input.Keyboard.JustDown(this.keyE)){
            if(this.musica1.isPlaying){
                this.musictime = this.musica1.seek;
                this.musica1.stop();
                this.musica2.play({loop:true,seek:this.musictime,volume:0.3});
            }
            else if(this.musica2.isPlaying){
                this.musictime = this.musica2.seek;
                this.musica2.stop();
                this.musica1.play({loop:true,seek:this.musictime,volume:0.3});
                
            }
        }
        
        if(this.keyOne.isDown){ //mapache
            if(this.player != this.animal1){ 
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
        }
        if(this.keyTwo.isDown){ 
            if(this.listaAnimales.getLength() >= 2 && this.player != this.animal2){
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
        }
        /*
                if(this.keyE.isDown){
            if(this.musica1.isPlaying && !this.musica2.isPlaying){
                this.musictime = this.musica1.seek;
                this.musica1.stop();
                this.musica2.play({loop:true,seek:this.musictime});
            }
            else if(!this.musica1.isPlaying && this.musica2.isPlaying){
                this.musictime = this.musica2.seek;
                this.musica2.stop();
                this.musica1.play({loop:true,seek:this.musictime});

            }
        }
        */
        
    }

    combatir(nombre) {
       this.musica1.stop();
        this.musica2.stop();
        this.scene.launch('batalla', {numeroAnimales: this.listaAnimales.getLength(), animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, numEnemigos: 1, tipoEnemigo: nombre, escena: 'tutorial'});
        this.scene.pause();
    }

}