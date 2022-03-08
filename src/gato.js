import Animales from './Animales.js'
export default class gato extends Animales {

    constructor(scene, x, y, f) {
        super(scene, x, y, f, 'gato', 100, 300, -900);
        
    }

}