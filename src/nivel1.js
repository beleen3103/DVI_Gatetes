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
        this.load.image('plataformas', 'assets/sprites/tiles.png');
    }

    //Belén: todo lo comentado son cosas que he probado para cambiar de personajes, aun no funciona
    create() {
        this.add.rectangle(1000,250,5000,5000,0xffffff,100); // FONDO
        this.player = new Gato(this, 100, 1200, true); // Personaje
        this.player.setDepth(100);  // Personaje por delante de los objetos
        this.createMap();   // Creacion mapa desde Tiled
        this.configureCamera(); // Camara que sigue al jugador
        this.createEnemies();
        
        this.createPlatforms(); //SOBRARÁ
        
        // this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }
    update(t, dt){
        //PLATAFORMAS OBJETO
        this.capaO.forEach(o=>{
            switch(o.name){
                //Bloques que hacen rebotar al jugador con una determinada velocidad
                case 'salto':
                    this.physics.collide(this.player,o,()=>{
                        if(this.player.body.bottom-1 < o.body.y) {
                            this.player.body.setVelocityY(this.player.jumpSpeed*1.1);
                        }
                    })

                break;
                //Bloques que permiten al gato escalar
                case 'trepar':
                    if(this.player.getName() === 'Anime2')
                    this.physics.overlap(this.player,o,()=>{
                        if(this.player.keyW.isDown)  {
                            this.player.body.velocity.y = -300/2;
                        }
                        else if(this.player.keyS.isDown) {
                            this.player.body.velocity.y = 300/2;
                        }
                        else if((!this.player.keyW.isDown && !this.player.keyS.isDown)) {
                          this.player.body.gravity.y = 0;
                          this.player.body.velocity.y = 0;
                        }
                    });
                break;
            };
        })
        //PLATAFORMAS TILE
        this.capa.forEachTile(tile=>{ 
            //Bloques trasparentes permiten que el jugador los atraviese desde la zona inferior o pulsando la tecla S
            switch(tile.properties.type){
                case 'ventana':
                    if(this.player.body.y > tile.getTop()) tile.setCollision(false,false,false,false);
                    else if(this.player.keyS.isDown) tile.setCollision(false,false,false,false);
                    else tile.setCollision(true,true,true,true);
                    break;
            }
        });
        
        //Bloques que se destruyen tras terminar la animación
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
    configureCamera(){
        let c = this.cameras.main;
        const lerpValue = 0.1
        c.setLerp(lerpValue,lerpValue);
        const xIni = 0, yIni = 0, xSize = 3000, ySize = 1200;
        c.setBounds(xIni,yIni,xSize,ySize+100) //Tamaño de la camara (minimo-maximo)
        this.physics.world.setBounds(xIni,yIni,xSize,ySize,true,true,true,true) //Tamaño de la escena
        c.startFollow(this.player);
    }
    createMap(){
        this.map = this.make.tilemap({
            key:'mapa',
            tileWidth: 30,
            tileHeight: 30
        });
        this.capaO = this.map.createFromObjects('colisiones');
        this.capaO.forEach(o=>{
            this.physics.world.enable(o);
            o.body.setImmovable(true);
            o.body.setAllowGravity(false);
        });

        const tileset1 = this.map.addTilesetImage('tiles','plataformas'); //hay que empotrar los tileset en el TILED (boton inferior derecho)
        this.capa = this.map.createLayer('balcones', tileset1);
        this.capa.setCollisionByProperty({colisiona: true});
        this.physics.add.collider(this.player,this.capa);
        
        if(this.physics.getConfig().debug){
            const debug = this.add.graphics().setAlpha(0.7)
            this.capa.renderDebug(debug,{
                tileColor: null,
                collidingTileColor: new Phaser.Display.Color(243,234,48,255),
                faceColor: new Phaser.Display.Color(40,39,37,255)
            });
        }
    }
    createEnemies(){
        new Npc(this, this.player, 600, 1170, 1200, true); //1-2 Enemigos en combate
        new Npc(this, this.player, 2160, 1620, 1200, true); //1-2 Enemigos en combate
    }
    // Sobrará
    createPlatforms(){
        this.Bloque = this.add.group();
        this.physics.add.collider(this.player,this.Bloque);
        //this.Bloque.add(new Platform(this,this.player,300,450,'platformBasica'));
        //this.Bloque.add(new Platform(this,this.player,300,200,'platformBasica'));

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
        this.scene.launch('batalla', {numeroAnimales: 1, animal1: this.player.getName(), animal1Vida: this.player.vida, animal2: '', animal2Vida: 0, animal3: '', animal3Vida: 0});
        this.scene.pause();
    }

}