import Phaser from 'phaser';
import HealthBar from './HealthBar.js';

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, { name, walk, idle }) {
    super(scene, x, y);

    this.enemyName = name;

    const anims = scene.anims;
    anims.create({
      key: `${name}-enemy-walk`,
      frames: anims.generateFrameNumbers("characters", { start: walk.start, end: walk.end }),
      frameRate: 8,
      repeat: -1
    });

    anims.create({
      key: `${name}-enemy-idle`,
      frames: anims.generateFrameNumbers('characters', { start: idle.start, end: idle.end }),
      frameRate: 8,
      repeat: -1
    })

    this.sprite = scene.physics.add
      .sprite(x, y, "characters", 0)
      .setSize(16, 16)
      .setOffset(0, 16)
      .setVelocity(0.5, 0.5);

    this.sprite.anims.play(`${name}-enemy-walk`);

		this.healthBar = new HealthBar(scene, x, y);
  }

  update() {
		this.healthBar.update(this.sprite.x, this.sprite.y);
		this.healthBar.draw();
  }

	decreaseHealth(amount) {
		return this.healthBar.decrease(amount);
	}

  destroy() {
		super.destroy();
    this.sprite.destroy();

		this.healthBar.healthBar.clear();
		delete this.healthBar;
  }
}
