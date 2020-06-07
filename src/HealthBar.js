// Health Bar for enemies (not player)

export default class HealthBar {
	constructor (scene, x, y) {
    this.healthBar = new Phaser.GameObjects.Graphics(scene);

		this.x = x;
    this.y = y;
    this.health = 100;
    this.width = 20;
		this.height = 7;
    this.draw();
    scene.add.existing(this.healthBar);
  }

	decrease (amount) {
    this.health -= amount;

    if (this.health < 0)
			this.health = 0;

		this.draw()
    return (this.health === 0);
	}

	update(x, y) {
		this.x = x;
		this.y = y;
	}

  draw () {
		this.healthBar.clear();

    this.healthBar.fillStyle(0x000000);
    this.healthBar.fillRect(this.x, this.y, this.width, this.height);

    this.healthBar.fillStyle(0xffffff);
    this.healthBar.fillRect(this.x + 2, this.y + 2, this.width-4, this.height-4);

    if (this.health < 30)
			this.healthBar.fillStyle(0xff0000);
    else
      this.healthBar.fillStyle(0x00ff00);

    this.healthBar.fillRect(this.x + 2, this.y + 2, Math.floor(this.width/100 * this.health), this.height-4);
	}

}
