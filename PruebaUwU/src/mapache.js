import Animales from './Animales.js'
export default class Mapache extends Animales {

    constructor(scene, x, y, f) {
        super(scene, x, y, f, 'mapache', 100, 300, -600);
        
    }
}
