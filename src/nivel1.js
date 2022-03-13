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

    //Belén: todo lo comentado son cosas que he probado para cambiar de personajes, aun no funciona
    create() {
       // this.mapache = new Mapache(this, 200, 300, true); //
       // this.gato = new gato(this, 200, 300, true)//
       // this.gato.setActive(false).setVisible(false); //
       // this.player = this.mapache; //
        this.player = new Gato(this, 200, 300, true);
        //this.createEnemies()
        this.createPlatforms();
        
       // this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        //new Pincho(this, this.mapache, 500, 450);
    }
    update(t, dt){
        this.BloqueTras.children.each(block =>{
            if(this.player.body.y > block.body.y) block.body.enable = false;
            else block.body.enable = true;
        })
        //if(this.player.body.y < this.b.body.y) this.b.body.enable = true;
            //else this.b.body.enable = false;
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
        new Npc(this, this.player, 900, 500, 430, true);
    }
    createPlatforms(){
        this.BloqueTras = this.add.group();
        this.BloqueTras.add(new Platform(this,this.player,200,350,true,'platformT'));
        this.BloqueTras.add(new Platform(this,this.player,200,200,true,'platformT'));
        this.Bloque = this.add.group();
        this.Bloque.add(new Platform(this,this.player,500,350,true,'platform'));
        this.Plants = this.add.group();
        this.Plants.add(new Platform(this,this.player,850,150,false,'puertaPlataformeo'));
        this.Plants.add(new Platform(this,this.player,850,350,false,'puertaPlataformeo'));
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