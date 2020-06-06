import Phaser from 'phaser';
import Dungeon from '@mikewesthad/dungeon';
import Tiles from './constants/Tiles';
import Player from './player';
import TilemapVisibility from "./tilemap-visibility";

export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({});
    this.level = 0;
  }

  preload() {
    this.load.image('tiles', 'assets/tilesets/dungeon.png');
    this.load.spritesheet(
      'characters',
      'assets/spritesheets/characters.png',
      {
        frameWidth: 16,
        frameHeight: 32
      }
    );
  }

  create() {
    ++this.level;
    this.hasPlayerReachedStairs = false;

    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      doorPadding: 2,
      rooms: {
        width: { min: 20, max: 30, onlyEven: true },
        height: { min: 20, max: 30, onlyEven: true }
      }
    });

    this.dungeon.drawToConsole({});

    const map = this.make.tilemap({
      tileWidth: 16,
      tileHeight: 16,
      width: this.dungeon.width,
      height: this.dungeon.height
    });

    const tileset = map.addTilesetImage('tiles', null, 16, 16, 0, 0);
    this.groundLayer = map.createBlankDynamicLayer('Ground', tileset).fill(Tiles.BLANK);
    this.wallLayer = map.createBlankDynamicLayer('Wall', tileset);
    this.stuffLayer = map.createBlankDynamicLayer('Stuff', tileset);
    const shadowLayer = map.createBlankDynamicLayer('Shadow', tileset).fill(Tiles.BLANK);

    this.tilemapVisibility = new TilemapVisibility(shadowLayer);

    for (const room of this.dungeon.rooms) {
      const { x, y, width, height, left, right, top, bottom } = room;

      // Placing ground tiles
      for (let offsetX = 0; x < width; ++offsetX) {
        for (let offsetY = 0; y < height; ++offsetY) {
          this.groundLayer.putTileAt(Tiles.FLOOR, left + offsetX, top + offsetY);
        }
      }

      // this.groundLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, Tiles.FLOOR);

      // Placing corner tiles
      this.wallLayer.putTileAt(Tiles.WALL.TOP_LEFT.TOP_HALF, left, top);
      this.wallLayer.putTileAt(Tiles.WALL.TOP_LEFT.BOTTOM_HALF, left, top - 1);
      this.wallLayer.putTileAt(Tiles.WALL.TOP_RIGHT.TOP_HALF, right, top);
      this.wallLayer.putTileAt(Tiles.WALL.TOP_RIGHT.BOTTOM_HALF, right, top - 1);
      this.wallLayer.putTileAt(Tiles.WALL.BOTTOM_RIGHT.TOP_HALF, right, bottom + 1);
      this.wallLayer.putTileAt(Tiles.WALL.BOTTOM_RIGHT.BOTTOM_HALF, right, bottom);
      this.wallLayer.putTileAt(Tiles.WALL.BOTTOM_LEFT.TOP_HALF, left, bottom + 1);
      this.wallLayer.putTileAt(Tiles.WALL.BOTTOM_LEFT.BOTTOM_HALF, left, bottom);

      for (let offsetX = 1; x < width - 1; ++offsetX) {
        this.wallLayer.putTileAt(Tiles.WALL.TOP.TOP_HALF, left + offsetX, top);
        this.wallLayer.putTileAt(Tiles.WALL.TOP.BOTTOM_HALF, left + offsetX, top - 1);
        this.wallLayer.putTileAt(Tiles.WALL.BOTTOM.TOP_HALF, left + offsetX, bottom + 1);
        this.wallLayer.putTileAt(Tiles.WALL.BOTTOM.BOTTOM_HALF, left + offsetX, bottom);
      }

      for (let offsetY = 2; y < height - 2; ++offsetY) {
        this.wallLayer.putTileAt(Tiles.WALL.LEFT, left, top + offsetY);
        this.wallLayer.putTileAt(Tiles.WALL.RIGHT, right, top + offsetY);
      }

      /*
      // Filling walls with mostly clean tiles, but occasionally place a dirty tile
      this.groundLayer.weightedRandomize(left + 1, top, width - 2, 1, Tiles.WALL.TOP);
      this.groundLayer.weightedRandomize(left + 1, bottom, width - 2, 1, Tiles.WALL.BOTTOM);
      this.groundLayer.weightedRandomize(left, top + 1, 1, height - 2, Tiles.WALL.LEFT);
      this.groundLayer.weightedRandomize(right, top + 1, 1, height - 2, Tiles.WALL.RIGHT);
       */


      // Placing the doors that connect the dungeon rooms. The x & y coordinates of the door are relative
      // to their room
      const doors = room.getDoorLocations();
      /*
      for (const door of doors) {
        if (door.y === 0) {
          this.groundLayer.putTilesAt(Tiles.DOOR.TOP, x + door.x - 1, y + door.y);
        } else if (door.y === room.height - 1) {
          this.groundLayer.putTilesAt(Tiles.DOOR.BOTTOM, x + door.x - 1, y + door.y);
        } else if (door.x === 0) {
          this.groundLayer.putTilesAt(Tiles.DOOR.LEFT, x + door.x, y + door.y - 1);
        } else if (door.x === room.width - 1) {
          this.groundLayer.putTilesAt(Tiles.DOOR.RIGHT, x + door.x, y + door.y - 1);
        }
      }
       */
    }

    const rooms = this.dungeon.rooms.slice();
    const startRoom = rooms.shift();
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);

    /*
    this.stuffLayer.putTileAt(Tiles.EXIT, endRoom.centerX, endRoom.centerY);

    for (const room of otherRooms) {
      const rand = Math.random();
      if (rand <= 0.25) {
        // 25% chance of finding a chest
        this.stuffLayer.putTileAt(Tiles.CHEST, room.centerX, room.centerY);
      }
    }

    this.stuffLayer.setTileIndexCallback(Tiles.EXIT, () => {
      this.stuffLayer.setTileIndexCallback(Tiles.EXIT, null, this);
      this.hasPlayerReachedStairs = true;
      this.player.freeze();
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once('camerafadeoutcomplete', () => {
        this.player.destroy();
        this.scene.restart();
      });
    }, this);
     */

    const playerRoom = startRoom;
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    this.player = new Player(this, x, y);

    this.physics.add.collider(this.player.sprite, this.groundLayer);
    this.physics.add.collider(this.player.sprite, this.stuffLayer);

    const camera = this.cameras.main;

    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);

    this.add
      .text(16, 16, `Find the stairs. Go deeper.\nCurrent level: ${this.level}`, {
        font: '18px monospace',
        fill: '#000000',
        padding: { x: 20, y: 10 },
        backgroundColor: '#ffffff'
      })
      .setScrollFactor(0);
  }

  update(time, delta) {
    if (this.hasPlayerReachedStairs) return;
    this.player.update();

    const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
    const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

    this.tilemapVisibility.setActiveRoom(playerRoom);
  }
}
