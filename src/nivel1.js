import Platform from './platform.js';
import PlatformT from './platformT.js';
import Mapache from './mapache.js';
import Npc from './npc.js';
import Pincho from './pincho.js';
import Queso from './queso.js';
import Gato from './gato.js';

export default class Nivel1 extends Phaser.Scene {
    
    constructor() {
        super({ key: 'nivel1' });
    }

    preload(){
        this.load.tilemapTiledJSON('mapa','assets/sprites/mapa.json');
        this.load.image('aaaa','assets/sprites/ventana.png');
    }

    //Belén: todo lo comentado son cosas que he probado para cambiar de personajes, aun no funciona
    create() {
        this.add.rectangle(1000,250,2000,500,0xffffff,100);
        this.player = new Gato(this, 100, 300, true);
        this.map = this.make.tilemap({
            key:'mapa',
            tileWidth: 30,
            tileHeight: 30
        });
        const tileset1 = this.map.addTilesetImage('ventana','aaaa'); //hay que empotrar los tileset en el TILED (boton inferior derecho)
        this.capa = this.map.createLayer('balcones', tileset1);
        // this.capa.setCollisionByProperty({collides: true});
        this.capa.setCollisionBetween(0,99)
        this.physics.add.collider(this.player,this.capa);

        
        let c = this.cameras.main;
        const lerpValue = 0.1
        c.setLerp(lerpValue,lerpValue);
        const xIni = 0, yIni = 0, xSize = 2000, ySize = 500;
        c.setBounds(xIni,yIni,xSize,ySize+100) //Tamaño de la camara (minimo-maximo)
        //this.physics.world.setBounds(xIni,yIni,xSize,ySize,true,true,true,true) //Tamaño de la escena
        
       // this.mapache = new Mapache(this, 200, 300, true); //
       // this.gato = new gato(this, 200, 300, true)//
       // this.gato.setActive(false).setVisible(false); //
       // this.player = this.mapache; //
        
        c.startFollow(this.player);
        this.createEnemies()
        this.createPlatforms();
        
       // this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        //new Pincho(this, this.mapache, 500, 450);
    }
    update(t, dt){
        //Bloques trasparentes permiten que el jugador los atraviese desde la zona inferior o pulsando la tecla S
        this.BloqueTras.children.each(block =>{
            if(this.player.body.y > block.body.y) block.body.enable = false;
            else if(this.player.keyS.isDown) block.body.enable = false;
            else block.body.enable = true;
        });
        //Bloques que hacen rebotar al jugador con una determinada velocidad
        this.physics.collide(this.player,this.BloqueRebota,()=>{
            this.BloqueRebota.children.each(block =>{
                if(this.player.body.bottom-1 < block.body.y){
                    this.player.body.setVelocityY(this.player.jumpSpeed);
                }
            });
        });
        this.physics.collide(this.player,this.a,()=>{
        //Bloques que se destruyen tras terminar la animación
        })
        this.BloqueBreak.children.each(block=>{
            if(this.physics.collide(this.player,block) && this.player.body.y < block.body.y) {
                if(!block.anims.hasStarted) block.play('romper');
            }
            if(block.anims.getProgress()===1) block.destroy(true);
        });
        
        /*if (this.keyC.isDown){ //cambiar personaje
            if(this.player.name == 'mapache') {
                this.mapache.setActive(false).setVisible(false);
                this.gato.setX(this.player.getX());
                this.gato.setY(this.player.getY());
                this.gato.setActive(true).setVisible(true);
                this.player = this.gato;
            }
           // if(this.player.name == 'gato') this.player = new Mapache(this, this.player.getX(), this.player.getY(), true);
        }*/

    }
    createEnemies(){
        //new Npc(this, this.player, 1300, 700, 430, true);
    }
    createPlatforms(){
        this.Bloque = this.add.group();
        this.physics.add.collider(this.player,this.Bloque);
        //this.Bloque.add(new Platform(this,this.player,300,450,'platformBasica'));
        //this.Bloque.add(new Platform(this,this.player,300,200,'platformBasica'));

        this.BloqueTras = this.add.group();
        this.physics.add.collider(this.player,this.BloqueTras);
        //this.BloqueTras.add(new Platform(this,this.player,300,300,'platformAtravesable'));
        //this.BloqueTras.add(new Platform(this,this.player,600,300,'platformAtravesable'));

        this.Plants = this.add.group();
        this.physics.add.overlap(this.player,this.Plants);
        //this.Plants.add(new Platform(this,this.player,550,200,'platformEnredadera'));
        //this.Plants.add(new Platform(this,this.player,1500,200,'platformEnredadera'));

        this.BloqueRebota = this.add.group();
        //this.BloqueRebota.add(new Platform(this,this.player,900,300,'platformRebote'));
        //this.BloqueRebota.add(new Platform(this,this.player,1200,300,'platformRebote'));

        this.BloqueBreak = this.add.group();
        //this.BloqueBreak.add(new Platform(this,this.player,1200,300,'platformRompe'));
        //this.BloqueBreak.add(new Platform(this,this.player,850,400,'platformRompe'));
        this.BloqueBreak.children.each(block =>{
            block.anims.create({
                key: 'romper',
                frames: block.anims.generateFrameNumbers('platformRompe', {start: 0, end: 5}),
                frameRate: 5
            });
        });
    }
    goHub(){
        this.scene.start('hub');
        this.scene.pause();
    }

    combatir() {
        this.scene.launch('batalla');
        this.scene.pause();
    }

}