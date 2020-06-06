export default class Bullet extends Phaser.GameObjects.Image {
	constructor(scene) {
		super(scene, 0, 0, 'bullet');
		this.speed = 1;

    this.born = 0;

    this.direction = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
	}

	fire(shooter, target) {
		console.log('Firing...');
		this.setPosition(shooter.x, shooter.y);
		this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

		// Calculate X and y velocity of bullet to moves it from shooter to target
    if (target.y >= this.y)
    {
        this.xSpeed = this.speed*Math.sin(this.direction);
        this.ySpeed = this.speed*Math.cos(this.direction);
    }
    else
    {
        this.xSpeed = -this.speed*Math.sin(this.direction);
        this.ySpeed = -this.speed*Math.cos(this.direction);
		}
    
    //this.rotation = Phaser.Math.Angle.Between(shooter.x, shooter.y, target.x, target.y); 
		this.rotation = shooter.rotation;

		this.born = 0;

		this.xSpeed=0.02;
		this.ySpeed=0.02;
	}

	update(time, delta) {
		console.log('Updating...');
		this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;

    this.born += delta;

    if (this.born > 1800)	{
        this.setActive(false);
        this.setVisible(false);
    }
	}
	
}
