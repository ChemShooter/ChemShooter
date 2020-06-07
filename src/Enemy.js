import Phaser from 'phaser';
import HealthBar from './HealthBar.js';

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, { name, walk, idle }) {
    super(scene, x, y);

    this.isDestroyed = false;
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

		this.healthBar = new HealthBar(scene, x, y, 100 + 1.5 * this.scene.level);
  }

  update() {
		this.healthBar.update(this.sprite.x, this.sprite.y);
		this.healthBar.draw();
  }

	decreaseHealth(amount) {
		return this.healthBar.decrease(amount);
	}

  destroy() {
    if (this.isDestroyed) return;
    this.isDestroyed = true;
    const frameIndex = Math.floor(Math.random() * 3);
    let atomicNumber;
    switch (frameIndex) {
      case 0: atomicNumber = 16; break;
      case 1: atomicNumber = 8; break;
      case 2: atomicNumber = 1; break;
    }

    const element = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'elementdrops', frameIndex);
    const elementAmounts = this.scene.game.elementAmounts;
    this.scene.physics.add.collider(element, this.scene.player.sprite, () => {
      element.destroy();
      elementAmounts[atomicNumber - 1] += 1;
    });
		super.destroy();
    this.sprite.destroy();

		if (this.healthBar) this.healthBar.healthBar.clear();
		delete this.healthBar;
  }
}
