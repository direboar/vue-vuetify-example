// import abilityType from './abilityType'

export default class Ability {
  constructor(abilityType, value) {
    // 値
    this.value = value
    // 能力値種類
    this.abilityType = abilityType
  }

  get modifier() {
    let div = (this.value - 10) / 2
    return Math.trunc(div)
  }
 
  static calcPonit(point) {
    if (point === 8) {
      return 0;
    }
    if (point === 9) {
      return 1;
    }
    if (point === 10) {
      return 2;
    }
    if (point === 11) {
      return 3;
    }
    if (point === 12) {
      return 4;
    }
    if (point === 13) {
      return 5;
    }
    if (point === 14) {
      return 7;
    }
    if (point === 15) {
      return 9;
    } else {
      throw new Error()
    }
  }
}
