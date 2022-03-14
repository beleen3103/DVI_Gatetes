import Animales from './Animales.js'
import Ataque from './Ataque.js';
export default class Mapache extends Animales {
    constructor(scene, x, y, f) {
        super(scene, x, y, f, 'Anime1', 100, 300, -600);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.fisicas = f;
        if(!this.fisicas){
            this.ataque1 = new Ataque(this.scene, 1, 10, 0, 0, false, 'mordisco',this.x-50, this.y+120);            
            this.ataque2 = new Ataque(this.scene, -1, 10, 0 , 0, false, 'curacion', this.x +50, this.y+120);
            this.ataque3 = new Ataque(this.scene, 1, 15, 0, 0, true, 'cola',this.x +150,this.y+120);

        }
    }
}

