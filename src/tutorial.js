import Basura from './basura.js';
import Platform from './platform.js';
import Mapache from './mapache.js';
import Pincho from './pincho.js';
import Queso from './queso.js';
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
        this.musica1.play({loop:true});
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.musicitme = 0;

        let c = this.cameras.main;
        const lerpValue = 0.1
        c.setLerp(lerpValue,lerpValue);
        const xIni = 0, yIni = 0, xSize = 2000, ySize = 500;
        c.setBounds(xIni,yIni,xSize,ySize+100) //Tamaño de la camara (minimo-maximo)
        this.physics.world.setBounds(xIni,yIni,xSize,ySize,true,true,true,true) //Tamaño de la escena

        this.mapache = new Mapache(this, 100, 450, true);

        new Basura(this, this.mapache, 600, 450); //Bloque de 160x100 px Tocon/Ladrillos....

        
        this.add.rectangle(1000,550,2000,100,0x00ff00);
        let elli = this.add.ellipse(140,220,200,80,0x32A8A3);
        elli.setStrokeStyle(2,0x2B908C);
        let fle = this.add.text(50,200,"Utiliza A D \nde direccion para mover", { font: "15px Verdana", align: "center"});
        this.container = this.add.container(0,0,[elli,fle]);

        let cambio1 = this.add.zone(300,0,10,1000);
        this.physics.world.enable(cambio1);
        cambio1.body.setAllowGravity(false);
        this.physics.add.overlap(this.mapache,cambio1,()=>{
            elli.setPosition(500,220);
            fle.setText("Utiliza el espacio o W\npara saltar");
            fle.setPosition(420,200);
            cambio1.destroy();
        })
        let cambio2 = this.add.zone(650,0,10,1000);
        this.physics.world.enable(cambio2);
        cambio2.body.setAllowGravity(false);
        this.physics.add.overlap(this.mapache,cambio2,()=>{
            this.container.destroy();
            cambio2.destroy();
        })
        new Npc(this, this.mapache, 1500, 940, 430, true);

        let fin = this.add.zone(1950,0,100,1000);
        this.physics.world.enable(fin);
        fin.body.setAllowGravity(false);
        this.physics.add.overlap(this.mapache,fin,()=>{
            this.scene.pause();
            this.scene.start('tutorial');
        });
        
        c.startFollow(this.mapache);
        //new Queso(this, this.mapache, 850, 120);
        //this.a = new PlatformT(this, this.mapache, 500, 350);

    }
    
    
    
    update(){
        //if(this.mapache.body.y < this.a.body.y) this.a.body.enable = true;
        //else this.a.body.enable = false;
        if(this.keyE.isDown){
            if(this.musica1.isPlaying && !this.musica2.isPlaying){
                this.musictime = this.musica1.seek;
                this.musica1.stop();
                this.musica2.play({loop:true,seek:this.musictime});
            }
            if(!this.musica1.isPlaying && this.musica2.isPlaying){
                this.musictime = this.musica2.seek;
                this.musica2.stop();
                this.musica1.play({loop:true,seek:this.musictime});

            }
        }
        
    }

    goHub(){
        this.scene.pause();
        this.scene.start('hub');
    }

    combatir() {
        this.scene.launch('batalla');
        this.scene.pause();
    }

}