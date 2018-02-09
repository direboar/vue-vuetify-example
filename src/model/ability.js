import abilityType from './abilityType'

export default class Ability {
  constructor (abilityType,value) {
    // 値
    this.value = 8
    // 能力値種類
    this.abilityType = abilityType
  }

  get modifier () {
    let div = (this.value - 10) / 2
    return Math.trunc(div)
  }
}
