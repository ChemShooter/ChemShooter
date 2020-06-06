import Enemy from '../Enemy';

export default class MuddyEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, {
      name: 'muddy',
      walk: {
        start: 26,
        end: 29
      },
      idle: {
        start: 22,
        end: 25,
      }
    })
  }
}
