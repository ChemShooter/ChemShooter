import Enemy from '../Enemy';

export default class SwampyEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, {
      name: 'swampy',
      idle: {
        start: 43,
        end: 46
      },
      walk: {
        start: 47,
        end: 50,
      }
    })
  }
}
