import Platform from './platform.js';
import PlatformT from './platformT.js';
import Mapache from './mapache.js';
import Npc from './emo.js';
import Rock from './rockero.js';
import Gato from './gato.js';
import Rata from './rata.js';
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
                this.animal.setScale(0.5,0.5);
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
        this.load.image('mapacheEvento','assets/sprites/mapacheEvento.png');
        this.load.image('emo','assets/sprites/emo.png');

        this.load.image('entrada','assets/sprites/entradaAlcantarilla.png');

        this.load.image('letraE','assets/sprites/E.png');
        this.load.image('sueloCallao','assets/background/sueloCallao.png');

        this.load.audio('musicaCallao', 'audio/DVI_Callao.ogg'); //Precargar el audio

    }
    
    create() {

        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.add.image(0,600,'sueloCallao').setOrigin(0).setScale(1);
        this.musica = this.sound.add('musicaCallao');
        this.musica.play({loop:true, volume:0.1});


        this.add.image(0, 50, 'callaoB').setOrigin(0).setScale(1.1); // FONDO
        this.add.image(777, 567, 'entrada').setOrigin(0).setScale(0.4); // FONDO
        //this.player = new Gato(this, this.x, this.y, true); // Personaje
        this.player.setDepth(100);  // Personaje por delante de los objetos
        this.configureCamera(); // Camara que sigue al jugador
        this.keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);        
        this.keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        
        this.feedback = this.add.text(310,200,"", { font: "30px Verdana"});
        this.feedback.setScrollFactor(0,0).setDepth(101);


        this.toTuto = this.add.zone(0,300,10,600);
        this.physics.world.enable(this.toTuto);
        this.toTuto.body.setAllowGravity(false);
        this.physics.add.overlap(this.listaAnimales.getChildren(),this.toTuto,()=>{
            this.scene.pause();
            this.scene.start('GranVia', {x: 2900,y:490, numeroAnimales: this.listaAnimales.getLength(),animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, actual: this.player.getName(), flip:true});
            this.musica.stop();
        });


        //PARA DESPUES DE CADA COMBATE QUE SE ACTUALICE LA VIDA
        let auxthis = this;
        this.events.on('resume',function(esc,data){
            if(!data.dialogo){
                //si ha perdido, fin del juego
                if(data.losed){
                    auxthis.scene.start('gameover', {x:100,y:490, numeroAnimales: 1, animal1: 'Gato', animal1Vida: 100, animal2: '.', animal2Vida: 0, animal3: '.', animal3Vida: 0, actual: 'Gato', flip: true});
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
       });
       //////////////////////////////////////////////////////////////////

       /*FIN DE DEMO */
      let finDemo = this.add.zone(1070,550,10,100);
            this.physics.world.enable(finDemo);
            finDemo.body.setAllowGravity(false);
     
            this.physics.add.overlap(this.listaAnimales.getChildren(),finDemo, ()=>{
                if(this.listaAnimales.getLength() === 3){
                    this.scene.pause();
                    this.scene.launch('dialogo', {nombreJSON: 'finDemo.json', prevScene:'Callao'});
                    
                    finDemo.destroy();                  
                }
                
            });

            let vueltaIni = this.add.zone(1095,550,10,100);
            this.physics.world.enable(vueltaIni);
            vueltaIni.body.setAllowGravity(false);
     
            this.physics.add.overlap(this.listaAnimales.getChildren(),vueltaIni, ()=>{
                if(this.listaAnimales.getLength() === 3){
                    this.scene.start("pantallaInicio");                  
                }
                
            });

        /* EVENTO MAPACHE */
        let tenemosMapache = false;
        this.mapacheSalvado = false;
        this.listaAnimales.children.each(animal => {
            if(animal.getName() === "Mapache"){
                tenemosMapache = true;
            }
        });


        this.eventoDisponible = false;
        this.eventoDisponible2 = false;
        if(!tenemosMapache){ //Solamente se podrá crear el evento si no tenemos el Mapache en el equipo
            //Si se pasa cierta zona del mapa, empieza el evento
            let colisionEvento = this.add.zone(420,490,20,220);
            this.physics.world.enable(colisionEvento);
            colisionEvento.body.setAllowGravity(false);
            this.mapacheEvento = this.add.image(610, 557, 'mapacheEvento').setOrigin(0).setScale(0.5);
            this.emo1 = this.add.image(500, 500, 'emo').setOrigin(0).setScale(0.5);
            this.emo2 = this.add.image(560, 500, 'emo').setOrigin(0).setScale(0.5);
            this.emo3 = this.add.image(670, 500, 'emo').setOrigin(0).setScale(0.5);
            this.emo1.flipX = true;
            this.emo2.flipX = true;
            
            this.physics.add.overlap(this.listaAnimales.getChildren(),colisionEvento,()=>{
                //Dialogo del Mapache pidiendo ayuda
                //Dialogo de los "fotografos" pidiéndole al Mapache que pose y gritándole monerías
                //Dialogo del gato diciendo: "Hmm debería ayudar a ese mapache"
                //Si se pulsa "q" empieza la pelea
                //Llamar al método eventoMapache
                this.scene.pause();
                this.scene.launch('dialogo', {nombreJSON: 'eventoMapache1.json', prevScene:'Callao'});
                this.eventoDisponible = true;
                colisionEvento.destroy();
            });

            //Overlap Entrar Evento Mapache
            let dialogoEvento = this.add.zone(605,550,200,100);
            this.physics.world.enable(dialogoEvento);
            dialogoEvento.body.setAllowGravity(false);

            this.physics.add.overlap(this.listaAnimales.getChildren(),dialogoEvento, ()=>{
                if(this.eventoDisponible){
                this.scene.launch('dialogo', {nombreJSON: 'eventoMapache2.json', prevScene:'Callao'});
                this.scene.pause();
                dialogoEvento.destroy();
                this.eventoDisponible2 = true;
            }
                // this.scene.launch('dialogo', {nombreJSON: 'eventoMapache2.json', prevScene:'Callao'});
            });

            let dialogoMapacheSalvado = this.add.zone(520,550,200,100);
            this.physics.world.enable(dialogoMapacheSalvado);
            dialogoMapacheSalvado.body.setAllowGravity(false);

            this.physics.add.overlap(this.listaAnimales.getChildren(),dialogoMapacheSalvado, ()=>{
                if(this.mapacheSalvado){
                    this.scene.launch('dialogo', {nombreJSON: 'eventoMapache3.json', prevScene:'Callao'});
                    this.scene.pause();
                    dialogoMapacheSalvado.destroy();
                    this.mapacheSalvado = false;

                    // this.scene.launch('dialogo', {nombreJSON: 'eventoMapache2.json', prevScene:'Callao'});
                }
            });
            





        }

        this.overlapAlcantarilla = false;
        if(this.listaAnimales.getLength() < 3){
            this.entradaAlcantarilla = this.add.zone(800,575,50,50);
        this.physics.world.enable(this.entradaAlcantarilla);
        this.entradaAlcantarilla.body.setAllowGravity(false);
        this.letraE = this.add.image(780,520,'letraE').setOrigin(0).setScale(0.3);
        this.letraE.setVisible(true);
        this.physics.add.overlap(this.listaAnimales.getChildren(),this.entradaAlcantarilla,()=>{
            this.overlapAlcantarilla = true;
            if(this.listaAnimales.getLength()>=2 && Phaser.Input.Keyboard.JustDown(this.keyE)){
                this.scene.pause();
                this.scene.start('Alcantarilla', {x:20, y:200, numeroAnimales: this.listaAnimales.getLength(),animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, actual: this.player.getName(), flip:true});
                this.musica.stop();
            }
        });
        }
        

    
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

        /* EVENTO MAPACHE */
        if(Phaser.Input.Keyboard.JustDown(this.keyE) && this.eventoDisponible2){
            this.eventoMapache();
            this.eventoDisponible = false;
            this.eventoDisponible2 = false;
            this.mapacheSalvado = true;
        }


        //Entrada Alcantarilla
        if(this.listaAnimales.getLength() < 3){
            var boundsA = this.player.getBounds();
            var boundsB = this.entradaAlcantarilla.getBounds();
            if(!Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)){
                this.letraE.setVisible(false);
            }
            else{
                this.letraE.setVisible(true);
            }
        }


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

    eventoMapache(){
        
        //Crear el mapache
        this.animal2 = new Mapache(this, this.player.x, this.player.y,true);
        this.listaAnimales.add(this.animal2);
        this.animal2.setActive(false).setVisible(false);
        this.animal2.barraVisible(false);
        this.animal2.setScale(0.5,0.5);
        this.mapacheEvento.setActive(false).setVisible(false);
        this.emo1.setActive(false).setVisible(false);
        this.emo2.setActive(false).setVisible(false);
        this.emo3.setActive(false).setVisible(false);
        this.eventoDisponible = false;
        //Pelea contra 3 emos Gato + Mapache
        this.scene.launch('batalla', {numeroAnimales: this.listaAnimales.getLength(), animal1: this.animal1.getName(), animal1Vida: this.animal1.vida, animal2: this.animal2.getName(), animal2Vida: this.animal2.vida, animal3: this.animal3.getName(), animal3Vida: this.animal3.vida, numEnemigos: 3, tipoEnemigo: "emo", escena: 'Callao'});
        this.scene.pause();
        this.musica.pause();
        //Dialogo del Mapache diciendo: "Me has salvado. Te estoy eternamente agradecido. Me acoplo".
        this.mapacheSalvado = true;
    }

}