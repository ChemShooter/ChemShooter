import Enemy from './Enemy';

export default class SkeletEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, {
      walk: {
        start: 9,
        end: 12
      },
      idle: {
        start: 13,
        end: 16
      }
    })
  }
}
