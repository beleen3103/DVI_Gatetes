import Mapache from './mapache.js';
import emo from './emo.js';
import Gato from './gato.js';
import Animales from './Animales.js';

export default class Batalla extends Phaser.Scene {

    constructor() {
        super({ key: 'batalla' });
        
    }

    init(data){
        this.mainScene = this.scene.get("sceneA name");
        this.add.image(0, 0, 'vs').setOrigin(0).setScale(1);
        this.listaAnimales = this.add.group(); //LISTA PA QUE LOS ANIMALES PEGUEN IGUAL QUE LOS MALOS
        this.numEnemigos = data.numEnemigos;
        this.tipoEnemigo = data.tipoEnemigo;
        for(let i=0; i<3; i++){
           // console.log(eval("data.animal"+(i+1)));
            
            if(eval("data.animal"+(i+1)) === "."){
                this.animal= new Animales(this, null, null, null,'.', 0, null,null);
                eval("this.animal"+(i+1)+"=this.animal");
            }
            else{
                if(eval("data.animal"+(i+1)) === "Anime1"){
                    this.animal = new Mapache(this,100,300,false); //creamos mapache                    
                }
                else if(eval("data.animal"+(i+1)) === "Anime2"){
                    this.animal = new Gato(this,200,300,false); //creamos gato
                }
                let vidaAux = eval("data.animal"+(i+1)+"Vida");
                this.animal.setVida(vidaAux); //asignamos la vida del animal
                this.animal.barra.setHealth(vidaAux);
                this.animal.updateScore();
                this.animal.setActive(false);

                
                eval("this.animal"+(i+1)+"=this.animal");               
                this.listaAnimales.add(eval("this.animal"+(i+1)));
            }
                // else if( eval(.....) === "Anime2")
            //else if(eval(.....) === "cuervo")
            //............
        }
    }

    preload(){
        this.load.audio('MusicaBatalla', 'audio/MusicaBatalla.ogg'); //Precargar el audio
    }

    create() {

        this.musica1 = this.sound.add('MusicaBatalla');
        this.musica1.play({loop:true, volume:0.5});

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.pointer = this.input.activePointer;
        
        
        
        this.fallo = this.add.text(400,70,"", { font: "60px Verdana"});
        // this.animal1 = new Mapache(this, 200, 300, false);
        //this.mapache = this.animal1;
        this.auxDT = 0;
        this.turn = 0;
        
        this.atacado = false;
        this.i = 0;
        this.anim = eval("this.animal"+(this.i+1));
        this.anim.crearAtaques();
       
        
        this.generarEnemigos();
       
    }

    generarEnemigos(){
        this.listaMalos = this.add.group();
        this.listaMalos.maxSize = this.numEnemigos;
        let xNpc = 600;
        const yNpc = 250;
        while(!this.listaMalos.isFull()){
            //se genera el tipo de enemigo con el que te hayas chocado
            eval("this.npc = new "+this.tipoEnemigo+"(this, this.listaAnimales.getChildren(), xNpc, xNpc, yNpc, false)");
            this.listaMalos.add(this.npc);
            xNpc += 150;
        }
    }
    update(t,dt){
        super.update(t,dt);
        
        if(this.turn === 0){
            if(this.atacado){
                this.atacado = false;
                
                this.anim.eliminarAtaques();
                //this.time.events.add(Phaser.Timer.SECOND * 4);
                this.pointer.active = false;
                
                if(this.i+1 === this.listaAnimales.getLength()) this.i = 0;
                else this.i++;
                
                
                this.anim = eval("this.animal"+(this.i+1));
                this.anim.crearAtaques();
                
                
                this.a = null;
            }
            this.click = true;

            this.anim.listaAtaques.children.each(ataque=>{ //selección de ataque
                ataque.on('pointerdown', () => {
                    this.a = ataque;
                });
            });
            
            if(this.a != null){
                if(this.a.getTarget() === 1 && !this.a.esBarrido()){
                    if(this.click){
                    this.turn = 1;
                    this.atacado = true;
                    this.click = false;   
                    
                    }                   
                }
                else if(this.a.getTarget() != 1){//curacion
                    if(this.click){
                        this.a.attack(this.anim);
                        if(this.i+1 === this.listaAnimales.getLength())this.turn = 2;
                        this.atacado = true;
                        this.click = false;
                    }
                }
                else if(this.a.getTarget() === 1 && this.a.esBarrido()){ //ataca a todos
                    if(this.click){
                        this.a.attack(this.listaMalos);
                        console.log("BARRIDO");
                        if(this.i+1 === this.listaAnimales.getLength())this.turn = 2;
                        this.atacado = true;
                        this.click = false;
                    }
                }
                this.auxDT = 0;
            }
            
        }
        else if(this.turn === 1){ //seleccion de enemigo si es necesario
            this.click = true;
            this.listaMalos.children.each(malo => { //se pueden clickar enemigos
                malo.setInteractive();
            });  
                this.listaMalos.children.each(malo => {
                    if(!malo.isDead()){
                        malo.on('pointerdown', () => {
                            if(this.click){
                                this.a.attack(malo);
                                if(this.i+1 === this.listaAnimales.getLength()) this.turn = 2;
                                else this.turn = 0;
                                this.click = false;
                                this.listaMalos.children.each(malo1 => { //ya no se pueden clickar
                                    malo1.disableInteractive();
                                }); 
                            }
                        });
                    }
                });
            
        }
        
        else{
            this.auxDT += dt;
            this.fallo.text = "";
            if(this.auxDT >= 2000) {
                this.turn = 0;
                this.listaMalos.children.each(malo => { //cada enemigo ataca
                    if(malo.active){ //si no esta muerto ya, ataca
                        //primero actualizamos cooldown
                        malo.advance();
                        this.ataqueMalo = malo.selectAttack();
                        this.ataca = Phaser.Math.Between(0, 100);
                        if(this.ataca < 80) {
                            if(this.ataqueMalo.getTarget() === 1) {
                                if(!this.ataqueMalo.esBarrido()) this.target = malo;
                                else this.target = this.listaMalos;
                            }
                            else{
                                if(this.ataqueMalo.esBarrido()) this.target = this.listaAnimales //todos los animales;
                                else { //random
                                    let rand = Phaser.Math.Between(0, this.listaAnimales.getLength()-1);
                                    let index = 0;
                                    this.listaAnimales.children.each(animal => {
                                        if(rand === index){
                                            this.target = animal;
                                        }
                                        index++;
                                    });
                                }                  
                            }
                            this.ataqueMalo.attack(this.target);
                        }
                        else{
                            this.fallo.text = "FALLO"; //estaria guay indicar cual de los dos falla
                        }
                    }
                });                
            }
        }
        while(this.listaMalos.countActive() > 0 && this.listaMalos.getFirstAlive().isDead()){ //desactiva los que estan muertos
            this.listaMalos.getFirstAlive().label.setVisible(false);
            this.listaMalos.getFirstAlive().barra.getBar().setVisible(false);
            this.listaMalos.getFirstAlive().setActive(false).setVisible(false);
        }
        //para ver si quedan animales vivos
        let siguenVivos = false;
        this.listaAnimales.children.each(anim=>{
            if(!anim.isDead()) siguenVivos = true;
        });
        if(!siguenVivos || this.listaMalos.countActive() === 0) { //ahora mismo solo comprueba que el npc al que podemos pegar esta vivo
            this.musica1.stop();
            this.scene.resume('tutorial'); //vuelve a la escena del mapa aunque desde el principio, no se guarda el estado
            this.scene.stop();
        }
    }
}