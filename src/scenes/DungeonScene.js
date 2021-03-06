import Phaser from "phaser";
import Dungeon from "@mikewesthad/dungeon";
import Player from "../Player";
import SkeletEnemy from "../enemies/SkeletEnemy";
import MuddyEnemy from "../enemies/MuddyEnemy";
import SwampyEnemy from "../enemies/SwampyEnemy";
import TILES from "../TileMapping";
import TilemapVisibility from "../TilemapVisibility.js";
import _ from 'lodash';

/**
 * Scene that generates a new dungeon
 */

// global
var mousehover=false;

export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({key: 'DungeonScene'});
    this.level = 0;
  }

  restartScene() {
    location.reload();
  }

  preload() {
    this.load.image("mytiles", "assets/tilesets/buch-tileset-48px-extruded.png");
    this.load.image("tiles", "assets/tilesets/dungeon.png" );
    this.load.image('wall-left', 'assets/tilesets/frames/wall_side_mid_left.png');
    this.load.image('wall-right', 'assets/tilesets/frames/wall_side_mid_right.png');
    this.load.spritesheet(
      "characters",
      "../assets/spritesheets/characters.png",
      {
        frameWidth: 16,
        frameHeight: 32
      }
    );
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.spritesheet('elementdrops', 'assets/images/element_drops.png', {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    ++this.level;
    this.hasPlayerReachedStairs = false;

    this.scene.launch('OverlayScene', this);

    // Generate a random world with a few extra options:
    //  - Rooms should only have odd number dimensions so that they have a center tile.
    //  - Doors should be at least 2 tiles away from corners, so that we can place a corner tile on
    //    either side of the door location
    this.dungeon = new Dungeon({
      width: 100,
      height: 100,
      doorPadding: 3,
      rooms: {
        width: {min: 15, max: 21, onlyOdd: true},
        height: {min: 15, max: 21, onlyOdd: true},
				maxRooms: this.level * 4
      },
    });

    // Creating a blank tilemap with dimensions matching the dungeon
    const map = this.make.tilemap({
      tileWidth: 16,
      tileHeight: 16,
      width: this.dungeon.width,
      height: this.dungeon.height
    });

    const oldTileset = map.addTilesetImage("mytiles", null, 48, 48, 1, 2); // 1px margin, 2px spacing
    const tileset = map.addTilesetImage('tiles', null, 16, 16);

    this.groundLayer = map.createBlankDynamicLayer("Ground", tileset).fill(TILES.BLANK);
    this.wallLayer = map.createBlankDynamicLayer("Wall", tileset);
    this.wallLayer.setDepth(1);
    this.wallGroup = this.physics.add.staticGroup();
    this.stuffLayer = map.createBlankDynamicLayer("Stuff", tileset);
    this.stuffLayer.setDepth(1);
    const shadowLayer = map.createBlankDynamicLayer("Shadow", oldTileset).fill(TILES.BLANK);
    shadowLayer.setDepth(2);

    this.enemyGroup = this.physics.add.group();

    this.tilemapVisibility = new TilemapVisibility(shadowLayer);

    // Use the array of rooms generated to place tiles in the map
    // Note: using an arrow function here so that "this" still refers to our scene
    this.dungeon.rooms.forEach(room => {
      const { x, y, width, height, left, right, top, bottom } = room;

      // Fill the floor with mostly clean tiles, but occasionally place a dirty tile
      // See "Weighted Randomize" example for more information on how to use weightedRandomize.
      this.groundLayer.weightedRandomize(x, y + 2, width, height - 2, TILES.FLOOR);

      // Place the room corners tiles
      this.wallLayer.putTilesAt(TILES.WALL.TOP_LEFT, left, top);
      this.wallLayer.putTilesAt(TILES.WALL.TOP_RIGHT, right, top);
      this.wallLayer.putTilesAt(TILES.WALL.BOTTOM_LEFT, left, bottom - 1);
      this.wallLayer.putTilesAt(TILES.WALL.BOTTOM_RIGHT, right, bottom - 1);

      for (let offsetX = 1; offsetX < width - 1; ++offsetX) {
        this.wallLayer.putTilesAt(TILES.WALL.TOP, left + offsetX, top);
        this.wallLayer.putTilesAt(TILES.WALL.TOP, left + offsetX, bottom - 1);
      }

      for (let offsetY = 2; offsetY < height - 2; ++offsetY) {
        this.wallLayer.putTileAt(TILES.WALL.LEFT, left, top + offsetY);
        this.wallLayer.putTileAt(TILES.WALL.RIGHT, right, top + offsetY);
      }

      // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
      // room's location
      const doors = room.getDoorLocations();
      for (const door of doors) {
        if (door.y === 0) {
          this.wallLayer.putTilesAt(TILES.DOOR.TOP, x + door.x - 1, y + door.y);
          this.groundLayer.weightedRandomize(x + door.x, y + door.y, 2, 2, TILES.FLOOR);
        } else if (door.y === room.height - 1) {
          this.wallLayer.putTilesAt(TILES.DOOR.BOTTOM, x + door.x - 1, y + door.y - 1);
          this.groundLayer.weightedRandomize(x + door.x, y + door.y - 1, 1, 2, TILES.FLOOR);
        } else if (door.x === 0) {
          this.wallLayer.putTilesAt(TILES.DOOR.LEFT, x + door.x - 1, y + door.y - 1);
        } else if (door.x === room.width - 1) {
          this.wallLayer.putTilesAt(TILES.DOOR.RIGHT, x + door.x, y + door.y - 1);
        }
      }
    });

    // Separate out the rooms into:
    //  - The starting room (index = 0)
    //  - A random room to be designated as the end room (with stairs and nothing else)
    //  - An array of 90% of the remaining rooms, for placing random stuff (leaving 10% empty)
    const rooms = this.dungeon.rooms.slice();
    const startRoom = rooms.shift();
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms);

    // Place the stairs
    this.stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);

    // Place the player in the first room
    const playerRoom = startRoom;
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    this.player = new Player(this, x, y);

    // Bullets stuff
    this.bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 20
    });

    this.input.on('pointerdown', this.shoot, this);

    // Watch the player and tilemap layers for collisions, for the duration of the scene:
    this.physics.add.collider(this.player.sprite, this.wallLayer);
    this.physics.add.collider(this.player.sprite, this.stuffLayer, (player, stuff) => {
				if (stuff.index === TILES.STAIRS) {
					this.hasPlayerReachedStairs = true;
					console.log(this.game.playerHealth);
					this.game.playerHealth = 100;
					this.player.freeze();
					const cam = this.cameras.main;
					cam.fade(250, 0, 0, 0);
					cam.once("camerafadeoutcomplete", () => {
					  this.player.destroy();
					  this.scene.restart();
					});
				}
		});
    this.physics.add.collider(this.player.sprite, this.wallGroup);

    // Remove bullen when it hits wall
    this.physics.add.collider(this.bullets, this.wallLayer, (bullet, wall) => { bullet.setActive(false); bullet.setVisible(false); });
    this.physics.add.collider(this.bullets, this.stuffLayer, (bullet, wall) => { bullet.setActive(false); bullet.setVisible(false); });
    this.physics.add.collider(this.bullets, this.wallGroup, (bullet, wall) => { bullet.setActive(false); bullet.setVisible(false); });

    const createEnemy = (room, enemyClass, offsetX, offsetY) => {
      const enemyX = map.tileToWorldX(room.centerX + offsetX);
      const enemyY = map.tileToWorldX(room.centerY + offsetY);
      // Put enemies in room
      const enemy = new enemyClass(this, enemyX, enemyY);
      this.enemyGroup.add(enemy);

      this.physics.add.collider(enemy.sprite, this.wallGroup);
      this.physics.add.collider(enemy.sprite, this.wallLayer);
      this.physics.add.collider(enemy.sprite, this.stuffLayer);
      this.physics.add.collider(enemy.sprite, this.player.sprite, () => {
        this.player.decreaseHealth(1);
      });
      this.physics.add.collider(enemy.sprite, this.bullets, _.throttle((e, bullet) => {
        bullet.setActive(false);
        bullet.setVisible(false);
        if (enemy.decreaseHealth(15)) {
          enemy.destroy();
          this.enemyGroup.remove(enemy);
        }
      }, 200));
    }


    [...otherRooms, endRoom].forEach(room => {
      createEnemy(room, SkeletEnemy, -3, -3);
      createEnemy(room, SwampyEnemy, -3, 3);
      createEnemy(room, MuddyEnemy, 3, 3);

      const rand = Math.random();
      if (rand <= 0.5) {
        // 50% chance of a pot anywhere in the room... except don't block a door!
        const x = Phaser.Math.Between(room.left + 2, room.right - 2);
        const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
        this.stuffLayer.putTileAt(TILES.BOX, x, y);
      } else {
        // 25% of either 2 or 4 towers, depending on the room size
        if (room.height >= 9) {
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 3, room.centerY + 3);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 3, room.centerY + 3);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 3, room.centerY - 4);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 3, room.centerY - 4);
        } else {
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 1);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 1);
        }
      }
    });

    this.groundLayer.setCollisionByExclusion([41, 42]);
    this.wallLayer.setCollisionByExclusion([-1, 0, 41, 80, 81, 72, 73, 1]);
    this.stuffLayer.setCollisionByExclusion([-1, 6, 7, 8, 26, 55]);

    this.wallLayer.forEachTile(tile => {
      if (tile.index === TILES.WALL.LEFT || tile.index === TILES.WALL.RIGHT) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();
        let wall;
        if (tile.index === TILES.WALL.LEFT) {
          wall = this.wallGroup.create(x, y, 'wall-right', 0, false);
          wall.body.setSize(4, 16).setOffset(0, 0);
        } else {
          wall = this.wallGroup.create(x, y, 'wall-left', 0, false);
          wall.body.setSize(4, 16).setOffset(12, 0);
        }
      }
    });

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;
    this.cameras.main.zoom = 2;

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);
  }

  shoot(pointer) {
    if (!mousehover) {
      var bullet = this.bullets.get(this.player.sprite.x, this.player.sprite.y + this.player.sprite.height/4);
      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);

        bullet.rotation = Phaser.Math.Angle.Between(this.player.sprite.x, this.player.sprite.y, pointer.worldX, pointer.worldY);

        this.physics.velocityFromRotation(bullet.rotation, 300, bullet.body.velocity);
      }
    }
  }

  update(time, delta) {
    if (this.hasPlayerReachedStairs) return;
    this.player.update();

    // Find the player's room using another helper method from the dungeon that converts from
    // dungeon XY (in grid units) to the corresponding room object
    const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
    const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

    this.tilemapVisibility.setActiveRoom(playerRoom);

    // If a bullet hits a wall, remove it
    this.bullets.children.each(function(b) {
        if (b.active) {
            if (b.y < 0) {
                b.setActive(false);
            }
        }
    }.bind(this));

    this.enemyGroup.getChildren().forEach((enemy) => {
      const enemyX = enemy.sprite.x;
      const enemyY = enemy.sprite.y;
      const enemyTileX = this.groundLayer.worldToTileX(enemyX);
      const enemyTileY = this.groundLayer.worldToTileY(enemyY);
      if (this.dungeon.getRoomAt(enemyTileX, enemyTileY) !== playerRoom)
        this.physics.velocityFromRotation(enemy.rotation, 0, enemy.sprite.body.velocity);
      const playerX = this.player.sprite.x;
      const playerY = this.player.sprite.y;
      const distance = Phaser.Math.Distance.Between(playerX, playerY, enemyX, enemyY);
      if (distance < 200) {
        enemy.rotation = Phaser.Math.Angle.Between(enemyX, enemyY, playerX, playerY);
        this.physics.velocityFromRotation(enemy.rotation, 50, enemy.sprite.body.velocity);
      } else {
        this.physics.velocityFromRotation(enemy.rotation, 0, enemy.sprite.body.velocity);
      }

      // Update enemy's health bar
      enemy.update();
    });
  }
}
