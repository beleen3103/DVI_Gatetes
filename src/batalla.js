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
        this.escena = data.escena; //nomre de la escena a la que volver
        this.add.image(0, 0, 'vs').setOrigin(0).setScale(1);
        this.listaAnimales = this.add.group(); //LISTA PA QUE LOS ANIMALES PEGUEN IGUAL QUE LOS MALOS
        this.numEnemigos = data.numEnemigos;
        this.tipoEnemigo = data.tipoEnemigo;
        let x = 110;
        for(let i=0; i<3; i++){
            if(eval("data.animal"+(i+1)) === "."){ //no hay animal
                this.animal= new Animales(this, null, null, null,'.', 0, null,null);
                eval("this.animal"+(i+1)+"=this.animal");
            }
            else{
                //creamos el animal que sea
                let nombre = eval("data.animal"+(i+1));
                this.animal = eval("new " + nombre +"(this,x,300,false)"); 
                this.animal.setScale(0.9,0.9);
                //asignamos la vida del animal
                let vidaAux = eval("data.animal"+(i+1)+"Vida");
                this.animal.setVida(vidaAux); 
                this.animal.barra.setHealth(vidaAux);
                this.animal.updateScore();
                this.animal.setActive(false);
                
                //lo añadimos al grupo
                eval("this.animal"+(i+1)+"=this.animal");               
                this.listaAnimales.add(eval("this.animal"+(i+1)));
                //posicion para el siguiente animal
                x+=100;
            }
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
        
        
        
        this.feedback = this.add.text(600,400,"", { font: "20px Verdana"});
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
            if(this.auxDT >= 2000) {
                this.turn = 0;
                let numEnem = 1;
                this.listaMalos.children.each(malo => { //cada enemigo ataca
                    if(malo.active){ //si no esta muerto ya, ataca
                        this.feedback.text = "";
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
                            
                            this.feedback.text = malo.textoAtaque(numEnem, this.target, this.a.esBarrido());
                            this.ataqueMalo.attack(this.target);
                        }
                        else{
                            this.feedback.text = "¡El enemigo";
                            if(this.listaMalos.getLength() > 1) this.feedback.text +=  " " +numEnem; //si hay mas de un enemigo indica cual falla
                            this.feedback.text += " ha fallado!";
                        }
                        numEnem++;
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
            let losed = false;
            if(!siguenVivos) losed = true;
            console.log(this.animal1.vida);
            this.scene.resume(this.escena, {losed: losed, animal1Vida: this.animal1.vida, animal2Vida: this.animal2.vida, animal3Vida: this.animal3.vida}); //vuelve a la escena del mapa aunque desde el principio, no se guarda el estado
            this.scene.stop();
        }
    }


    getVidas(i){
        let vida = eval("this.animal"+(i+1)+".vida");
        return vida;
    }
}