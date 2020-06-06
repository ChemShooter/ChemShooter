export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;
    anims.create({
      key: "player-walk",
      frames: anims.generateFrameNumbers("characters", { start: 1, end: 4 }),
      frameRate: 8,
      repeat: -1
    });

    this.sprite = scene.physics.add
      .sprite(x, y, 'characters', 0)
      .setSize(16, 32)
      .setOffset(0, 0);

    this.sprite.anims.play('player-walk');

    this.keys = scene.input.keyboard.createCursorKeys();
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update() {
    const keys = this.keys;
    const sprite = this.sprite;
    const speed = 300;
    const prevVelocity = sprite.body.velocity.clone();

    sprite.body.setVelocity(0);

    if (keys.left.isDown) {
      sprite.body.setVelocityX(-speed);
      sprite.setFlipX(true);
    } else if (keys.right.isDown) {
      sprite.body.setVelocityX(speed);
      sprite.setFlipX(false);
    }

    if (keys.up.isDown) {
      sprite.body.setVelocityY(-speed);
    } else if (keys.down.isDown) {
      sprite.body.setVelocityY(speed);
    }

    sprite.body.velocity.normalize().scale(speed);

    if (keys.left.isDown || keys.right.isDown) {
      sprite.anims.play('player-walk', true);
    } else if (keys.up.isDown) {
      sprite.anims.play('player-walk', true);
    } else {
      sprite.anims.stop();

      if (prevVelocity.y < 0) sprite.setTexture('characters', 5);
      else sprite.setTexture('characters', 5);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}

