import Phaser from 'phaser';

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    const anims = scene.anims;
    anims.create({
      key: "enemy-walk",
      frames: anims.generateFrameNumbers("characters", { start: 9, end: 12 }),
      frameRate: 8,
      repeat: -1
    });

    anims.create({
      key: 'enemy-idle',
      frames: anims.generateFrameNumbers('characters', { start: 13, end: 16 }),
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

  update() {
    const keys = this.keys;
    const sprite = this.sprite;
    const speed = 100;

    // Stop any previous movement from the last frame
    sprite.body.setVelocity(0);

    // Horizontal movement
    if (keys.left.isDown) {
      sprite.body.setVelocityX(-speed);
      sprite.setFlipX(true);
    } else if (keys.right.isDown) {
      sprite.body.setVelocityX(speed);
      sprite.setFlipX(false);
    }

    // Vertical movement
    if (keys.up.isDown) {
      sprite.body.setVelocityY(-speed);
    } else if (keys.down.isDown) {
      sprite.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    sprite.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right/down animations precedence over up animations
    if (keys.left.isDown || keys.right.isDown || keys.down.isDown || keys.up.isDown) {
      sprite.anims.play("enemy-walk", true);
    } else {
      sprite.anims.play('enemy-idle', true);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
