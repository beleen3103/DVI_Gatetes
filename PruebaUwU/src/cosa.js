import Platform from './platform.js';
import PlatformT from './platformT.js';
import Mapache from './mapache.js';
import Pincho from './pincho.js';
import Queso from './queso.js';

export default class Cosa extends Phaser.Scene {

    constructor() {
        super({ key: 'cosa' });
    }
    preload(){this.load.image('background', 'assets/background/batalla.jpg')}

    create() {
        this.add.image(0,0,'background').setOrigin(0);

        let c = this.cameras.main;
        const lerpValue = 0.1
        c.setLerp(lerpValue,lerpValue);
        const xIni = 0, yIni = 0, xSize = 2000, ySize = 500;
        c.setBounds(xIni,yIni,xSize,ySize) //Tamaño de la camara (minimo-maximo)
        this.physics.world.setBounds(xIni,yIni,xSize,ySize,true,true,true,true) //Tamaño de la escena

        this.mapache = new Mapache(this, 200, 300, true);
        this.a = new PlatformT(this, this.mapache, 500, 350);
        
        new Platform(this, this.mapache, 850, 200);
        new Queso(this, this.mapache, 850, 120);
        
        c.startFollow(this.mapache);
        
        //c.setFollowOffset(0,150);
    }
    update(){
        if(this.mapache.body.y < this.a.body.y) this.a.body.enable = true;
        else this.a.body.enable = false;
      }

    nomnomQuesito(){
        //this.scene.pause();
        //this.scene.start('hub');
    }

}