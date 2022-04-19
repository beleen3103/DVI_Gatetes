import Platform from './platform.js';
import PlatformT from './platformT.js';
import Mapache from './mapache.js';
import Npc from './emo.js';
import Pincho from './pincho.js';
import Queso from './queso.js';
import Gato from './gato.js';
import Animales from './Animales.js';

export default class Nivel1 extends Phaser.Scene {
    
    constructor() {
        super({ key: 'nivel1' });
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

                 //si no es el animal que estabamos usando en la escena anterior, lo hacemos no visible
                 if(this.animal.getName() != data.actual) this.animal.setActive(false).setVisible(false);
                 else this.player = this.animal;
                 
                 eval("this.animal"+(i+1)+"=this.animal");               
                 this.listaAnimales.add(eval("this.animal"+(i+1)));
             }
        }
        
    }



    preload(){
        this.load.tilemapTiledJSON('mapa','assets/sprites/mapa.json');
        this.load.image('plataformas', 'assets/sprites/tiles.png');
    }
    
    //Belén: todo lo comentado son cosas que he probado para cambiar de personajes, aun no funciona
    create() {
        this.add.rectangle(1000,250,5000,5000,0xffffff,100); // FONDO
        //this.player = new Gato(this, this.x, this.y, true); // Personaje
        this.player.setDepth(100);  // Personaje por delante de los objetos
        this.createMap();   // Creacion mapa desde Tiled
        this.configureCamera(); // Camara que sigue al jugador
        this.createEnemies();
        
        let toTuto = this.add.zone(0,0,10,5000);
        this.physics.world.enable(toTuto);
        toTuto.body.setAllowGravity(false);
        this.physics.add.overlap(this.player,toTuto,()=>{
            this.scene.pause();
            this.scene.start('tutorial', {x: 1800, y: 450, numeroAnimales: this.listaAnimales.getLength(),animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, actual: this.player.getName()});
        });

        let toCallaoA = this.add.zone(3000, 0, 10, 800);
        this.physics.world.enable(toCallaoA);
        toCallaoA.body.setAllowGravity(false);
        this.physics.add.overlap(this.player,toCallaoA,()=>{
            this.scene.pause();
            this.scene.start('nivel1', {x: 100,y:450, numeroAnimales: this.listaAnimales.getLength(),animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, actual: this.player.getName()});
        })


        let toCallaoB = this.add.zone(3000,1000,10,800);
        this.physics.world.enable(toCallaoB);
        toCallaoB.body.setAllowGravity(false);
        this.physics.add.overlap(this.player,toCallaoB,()=>{
            this.scene.pause();
            this.scene.start('nivel1', {x: 100,y: 1200, numeroAnimales: this.listaAnimales.getLength(),animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, actual: this.player.getName()});
        })



        this.createPlatforms(); //SOBRARÁ
        

        //PARA DESPUES DE CADA COMBATE QUE SE ACTUALICE LA VIDA
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
                    if(this.player.getName() === 'Gato')
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

    combatir(nombre) {
        this.scene.launch('batalla', {numeroAnimales: this.listaAnimales.getLength(), animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, numEnemigos: 1, tipoEnemigo: nombre, escena:'nivel1'});
        this.scene.pause();
    }

}