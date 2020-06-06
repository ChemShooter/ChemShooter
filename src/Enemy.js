import Phaser from 'phaser';

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, { walk, idle }) {
    super(scene, x, y);

    const anims = scene.anims;
    anims.create({
      key: "enemy-walk",
      frames: anims.generateFrameNumbers("characters", { start: walk.start, end: walk.end }),
      frameRate: 8,
      repeat: -1
    });

    anims.create({
      key: 'enemy-idle',
      frames: anims.generateFrameNumbers('characters', { start: idle.start, end: idle.end }),
      frameRate: 8,
      repeat: -1
    })

    this.sprite = scene.physics.add
      .sprite(x, y, "characters", 0)
      .setSize(16, 16)
      .setOffset(0, 16)
      .setVelocity(0.5, 0.5);

    this.sprite.anims.play("enemy-walk");
  }

  destroy() {
    this.sprite.destroy();
  }
}
