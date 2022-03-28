import Basura from './basura.js';
import Platform from './platform.js';
import Mapache from './mapache.js';
import Gato from './gato.js';
import Npc from './npc.js';

export default class Cosa extends Phaser.Scene {
    
    constructor() {
        super({ key: 'tutorial' });
        
    }
    preload(){
        this.load.image('background', 'assets/background/fondo.png');
        this.load.audio('DVI_01', 'audio/DVI_01.ogg'); //Precargar el audio
        this.load.audio('DVI_02', 'audio/DVI_02.ogg'); //Precargar el audio
    }

    create() {
        this.add.image(0,0,'background').setOrigin(0);

        this.musica1 = this.sound.add('DVI_01');
        this.musica2 = this.sound.add('DVI_02');
        this.musica2.play({loop:true, volume:0.3});
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); 
        this.keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);        
        this.keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        //animales que el player lleva, se le asigna gato
        this.listaAnimales = this.add.group();
        this.m = new Mapache(this, 100, 450, true);
        this.g = new Gato(this, 100, 450, true);
        this.listaAnimales.add(this.g);
        this.listaAnimales.add(this.m);
        this.m.setActive(false).setVisible(false);    
        this.player = this.g;    


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
        this.physics.add.overlap(this.player,fin,()=>{
            this.scene.pause();
            this.scene.start('tutorial');
        });
        
        this.c.startFollow(this.player);

    }
    createEnemies(){
        new Npc(this, this.player, 1500, 940, 430, true);
    }
    createPlatforms(){
        new Basura(this, this.player, 600, 450);
    }
    
    tutorialText(){
        this.add.rectangle(1000,550,2000,100,0x00ff00);
        let elli = this.add.ellipse(140,220,200,80,0x32A8A3);
        elli.setStrokeStyle(2,0x2B908C);
        let fle = this.add.text(50,200,"Utiliza A D \nde direccion para mover", { font: "15px Verdana", align: "center"});
        this.container = this.add.container(0,0,[elli,fle]);

        let cambio1 = this.add.zone(300,0,10,1000);
        this.physics.world.enable(cambio1);
        cambio1.body.setAllowGravity(false);
        this.physics.add.overlap(this.player,cambio1,()=>{
            elli.setPosition(500,220);
            fle.setText("Utiliza el espacio o W\npara saltar");
            fle.setPosition(420,200);
            cambio1.destroy();
        })
        let cambio2 = this.add.zone(650,0,10,1000);
        this.physics.world.enable(cambio2);
        cambio2.body.setAllowGravity(false);
        this.physics.add.overlap(this.player,cambio2,()=>{
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
            if(this.player != this.m){ 
                let auxX = this.player.getX();
                let auxY = this.player.getY();

                this.player.setActive(false).setVisible(false);
                this.player = null;
                this.player = this.m;
                this.player.body = this.m.body;
                this.player.setPosition(auxX,auxY);
                this.m.setActive(true).setVisible(true);

            }
        }
        if(this.keyTwo.isDown){ //gato
            if(this.player != this.g){
                let auxX = this.player.getX();
                let auxY = this.player.getY();
                
                this.player.setActive(false).setVisible(false);
                this.player = null;
                this.player = this.g;
                this.player.body = this.g.body;
                this.player.setPosition(auxX,auxY);
                this.g.setActive(true).setVisible(true);
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

    goHub(){
        this.scene.pause();
        this.scene.start('hub');
    }

    combatir() {
        //aqui habria que hacer un if else dependiendo de cuantos animales tengamos
        //entonces los datos a pasar serían {nPersonajes = (digamos 3), listaVidas= lista con las vidas de los animales, listaIds = lista de strings con el nombre de los animales}
        this.scene.launch('batalla');
        this.scene.pause();
    }

}