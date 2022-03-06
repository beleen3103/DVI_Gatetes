import Basura from './basura.js';
import PlatformT from './platformT.js';
import Mapache from './mapache.js';
import Pincho from './pincho.js';
import Queso from './queso.js';
import Npc from './npc.js';

export default class Cosa extends Phaser.Scene {

    constructor() {
        super({ key: 'tutorial' });
    }
    preload(){this.load.image('background', 'assets/background/fondo.png')}

    create() {
        this.add.image(0,0,'background').setOrigin(0);

        let c = this.cameras.main;
        const lerpValue = 0.1
        c.setLerp(lerpValue,lerpValue);
        const xIni = 0, yIni = 0, xSize = 2000, ySize = 500;
        c.setBounds(xIni,yIni,xSize,ySize) //Tamaño de la camara (minimo-maximo)
        this.physics.world.setBounds(xIni,yIni,xSize,ySize,true,true,true,true) //Tamaño de la escena

        this.mapache = new Mapache(this, 200, 300, true);

        new Basura(this, this.mapache, 600, 450); //Bloque de 160x100 px Tocon/Ladrillos....

        
        new Npc(this, this.mapache, 1500, 940, 430, true);

        let fin = this.add.zone(1950,0,100,1000);
        this.physics.world.enable(fin);
        fin.body.setAllowGravity(false);
        this.physics.add.overlap(this.mapache,fin,()=>{
            this.scene.pause();
            this.scene.start('nivel1');
        });
        /*if(this.scene.physics.collision(this.mapache, this.fin)){
            this.scene.pause();
            this.scene.start('nivel1');
        }*/
        
        c.startFollow(this.mapache);
        //new Queso(this, this.mapache, 850, 120);
        //this.a = new PlatformT(this, this.mapache, 500, 350);
        //c.setFollowOffset(0,150);
    }
    
    
    
    update(){
        //if(this.mapache.body.y < this.a.body.y) this.a.body.enable = true;
        //else this.a.body.enable = false;
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