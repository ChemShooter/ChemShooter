/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;
    anims.create({
      key: "player-walk",
      frames: anims.generateFrameNumbers("characters", { start: 5, end: 8 }),
      frameRate: 8,
      repeat: -1
    });

    anims.create({
      key: 'player-idle',
      frames: anims.generateFrameNumbers('characters', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    })

    this.sprite = scene.physics.add
      .sprite(x, y, "characters", 0)
      .setSize(16, 16)
      .setOffset(0, 16);

    this.sprite.anims.play("player-walk");

    this.keys = this.scene.input.keyboard.createCursorKeys();
	}

  freeze() {
    this.sprite.body.moves = false;
  }

  update() {
    const keys = this.keys;
    const sprite = this.sprite;
    const speed = 100;
		const pointer = this.pointer;

    // Stop any previous movement from the last frame
    sprite.body.setVelocity(0);

		// Rotate player towards mouse pointer
		// sprite.rotation = Phaser.Math.Angle.Between(sprite.x, sprite.y, pointer.x, pointer.y);

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
      sprite.anims.play("player-walk", true);
    } else {
      sprite.anims.play('player-idle', true);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
