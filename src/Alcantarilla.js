import Dialogo from "./dialogo.js";
import Gato from './gato.js';
import Rata from './rata.js';
import Mapache from './mapache.js';
import Animales from './Animales.js';
import Caja from './Caja.js';
export default class Alcantarilla extends Phaser.Scene {
    
    constructor() {
        super({ key: 'Alcantarilla' });
    }

    init(data){
        //posicion del animal
        this.x = data.x;
        this.y = data.y;
        this.move = false;

        //lista de animales que tenemos disponibles
        this.listaAnimales = this.add.group();

        for(let i=0; i<3; i++){

             if(eval("data.animal"+(i+1)) === "."){ //animal vacio, es decir, no tenemos 3 animales
                 this.animal = new Animales(this, null, null, null, '.', 0, null, null);
                 this.animal.barra.getBar().setVisible(false);
                 this.animal.label.setVisible(false);
                 this.animal.setVisible(false);
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
        this.load.tilemapTiledJSON('Alcantarilla','assets/sprites/Alcantarilla.json');
        this.load.image('plataformasA', 'assets/sprites/alcantarillasTiles.png');
        this.load.image('caja', 'assets/sprites/caja.png');

        this.load.image('rata','assets/sprites/rata.png');

        this.load.audio('musicaAlcantarilla', 'audio/DVI_Alcantarilla.ogg'); //Precargar el audio

        this.load.image('letraE','assets/sprites/E.png')
    }

    create(){

        this.musica = this.sound.add('musicaAlcantarilla');
        this.musica.play({ loop: true, volume: 0.1 });
        this.add.image(0, 0, 'alcantarillaB').setOrigin(0).setScale(1).setDepth(-1);


        //Rata
        this.tenemosRata = false;
        this.rata = this.add.image(365, 785, 'rata').setOrigin(0).setScale(1).setDepth(1);


        this.caja = new Caja(this, this.listaAnimales, 470, 860);
        this.player.setDepth(100);  // Personaje por delante de los objetos
        this.createMap();
        this.configureCamera(); // Camara que sigue al jugador
        this.keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);        
        this.keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
        this.feedback = this.add.text(220,200,"", { font: "30px Verdana"});
        this.feedback.setScrollFactor(0,0).setDepth(101);





        let auxthis = this;
        this.events.on('resume',function(esc,data){
            if(!data.dialogo){
                //si ha perdido, fin del juego
                if(data.losed){
                    auxthis.scene.start('gameover');
                }
                else{//sino, actualizamos vida
                    let changePlayer = false;
                    for(let i=0; i<3; i++){
                        if(eval("auxthis.animal"+(i+1)+".getName()") != "."){ //si hay un animal, le asignamos la vida que le queda
                            let auxVida = eval("data.animal"+(i+1)+"Vida");
                            eval("auxthis.animal"+(i+1)+".setVida(auxVida)");
                            eval("auxthis.animal"+(i+1)+".barra.setHealth(auxVida)");
                            //if(auxVida === 0) eval("auxthis.animal"+(i+1)+".setActive(false)");
                            if(auxthis.player.getName() === eval("auxthis.animal"+(i+1)+".getName()") && auxVida === 0) changePlayer = true;
                        }
                        
                    }
                    if(changePlayer){
                        let changed = false;
                        auxthis.listaAnimales.children.each(animal =>{
                            if(animal.vida > 0 && !changed){
                                let auxX = auxthis.player.getX();
                                let auxY = auxthis.player.getY();
                                
                                auxthis.player.body.enable=false; //quitamos el animal actual
                                auxthis.player.setActive(false).setVisible(false); 
                                auxthis.player.barraVisible(false);
                                
                                auxthis.player = animal; //cambiamos al nuevo
                                auxthis.player.setPosition(auxX,auxY);
                                
                                auxthis.player.setActive(true).setVisible(true); //hacemos visible el nuevo
                                auxthis.player.body.enable=true;
                                auxthis.player.barraVisible(true);

                                changed = true;
                            }
                        });
                    }
                    auxthis.musica.resume();
                }
            }
            auxthis.rata.setActive(false).setVisible(false);
       });



        /* EVENTO RATA */
        this.listaAnimales.children.each(animal => {
            if(animal.getName() === "Rata"){
                this.tenemosRata = true;
            }
        });

        if(!this.tenemosRata){
            this.rata.setActive(true).setVisible(true);

            let colisionEvento = this.add.zone(280,790,20,220);
            this.physics.world.enable(colisionEvento);
            colisionEvento.body.setAllowGravity(false);

            this.physics.add.overlap(this.listaAnimales.getChildren(),colisionEvento,()=>{
                                
                this.animal3 = new Rata(this, this.player.x, this.player.y,true);
                this.listaAnimales.add(this.animal3);
                this.animal3.setActive(false).setVisible(false);
                this.animal3.barraVisible(false);
                this.animal3.setScale(1,1);
                
                this.scene.pause();
                this.scene.launch('dialogo', {nombreJSON: 'eventoRata1.json', prevScene:'Alcantarilla'}).bringToTop();
                this.scene.moveBelow('dialogo');
                colisionEvento.destroy();


            });
            
        }

        //Volver a Callao
        this.toCallao = this.add.zone(40,0,60,30);
        this.physics.world.enable(this.toCallao);
        this.toCallao.body.setAllowGravity(false);
        this.physics.add.overlap(this.listaAnimales.getChildren(),this.toCallao,()=>{
            this.scene.pause();
            this.scene.start('Callao', {x: 500,y:490, numeroAnimales: this.listaAnimales.getLength(),animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, actual: this.player.getName(), flip:true});
            this.musica.stop();
        });

        this.letraE = this.add.image(435,790,'letraE').setOrigin(0).setScale(0.3);
        this.letraE.setVisible(true);

    }


    update(t, dt){
        this.c.startFollow(this.player);
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
                    if (this.player.getName() === 'Gato')
                        this.physics.overlap(this.player, o, () => {
                            if (this.player.keyW.isDown) {
                                this.player.body.velocity.y = -300 / 2;
                                if (!this.move) {
                                    this.player.play('trepa');
                                    this.player.chain('paratrepa');
                                    this.move = true;
                                }


                            }
                            else if (this.player.keyS.isDown) {
                                this.player.body.velocity.y = 300 / 2;

                                if (!this.move) {
                                    this.player.play('trepa');
                                    this.player.chain('paratrepa');
                                    this.move = true;
                                }

                            }
                            else if ((!this.player.keyW.isDown && !this.player.keyS.isDown)) {
                                this.player.body.gravity.y = 0;
                                this.player.body.velocity.y = 0;
                                if ((!this.player.keyA.isDown && !this.player.keyD.isDown)) this.player.stop();
                                this.move = false;
                            }

                        });
                    break;
            };
            this.auxDT += dt;
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


        if(this.tenemosRata){
            this.rata.setActive(false).setVisible(false);
        }

        //Overlap Caja para curarse
	    var boundsA = this.player.getBounds();
	    var boundsB = this.caja.getBounds();
	    if(!Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)){
            this.letraE.setVisible(false);
        }
        else{
            this.letraE.setVisible(true);
        }
    }


    configureCamera(){
        this.c = this.cameras.main;
        const lerpValue = 0.1
        this.c.setLerp(lerpValue,lerpValue);
        const xIni = 0, yIni = 0, xSize = 3000, ySize = 1200;
        this.c.setBounds(xIni,yIni,xSize,ySize+100) //Tamaño de la camara (minimo-maximo)
        this.physics.world.setBounds(xIni,yIni,xSize,ySize,true,true,true,true) //Tamaño de la escena
        //this.c.startFollow(this.player);
    }

    createMap(){
        this.map = this.make.tilemap({
            key:'Alcantarilla',
            tileWidth: 30,
            tileHeight: 30
        });

        this.capaO = this.map.createFromObjects('colisiones');
        this.capaO.forEach(o=>{
            this.physics.world.enable(o);
            o.body.setImmovable(true);
            o.body.setAllowGravity(false);
        });


        const tileset1 = this.map.addTilesetImage('alcantarillasTiles','plataformasA'); //hay que empotrar los tileset en el TILED (boton inferior derecho)
        this.capa = this.map.createLayer('suelo', tileset1);
        this.capa.setCollisionByProperty({colisiona: true});
        this.physics.add.collider(this.listaAnimales,this.capa);
        
        if(this.physics.getConfig().debug){
            const debug = this.add.graphics().setAlpha(0.7)
            this.capa.renderDebug(debug,{
                tileColor: null,
                collidingTileColor: new Phaser.Display.Color(243,234,48,255),
                faceColor: new Phaser.Display.Color(40,39,37,255)
            });
        }
    }



}