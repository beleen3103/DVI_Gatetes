export default class HealthBar {
    constructor(scene, x, y,maxHealth){
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x=x;
        this.y=y;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.draw();
        scene.add.existing(this.bar);
    }

    getBar(){
        return this.bar;
    }

    decrease(x){
        
        if(this.health > 0) this.health -= x;
        if(this.health < 0) this.health = 0;
        if(this.health > this.maxHealth) this.health = this.maxHealth;    
        
        this.draw();
    }

    isDead(){
        return this.health === 0;
    }

    draw(){
        this.bar.clear();
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x,this.y,100,16);
        this.bar.fillStyle(0x008000);
        var d = Math.floor((this.health/this.maxHealth)*100);
        if(!this.isDead()) this.bar.fillRect(this.x,this.y,d,16);
    }
}