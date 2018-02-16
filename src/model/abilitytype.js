let STRENGTH = null
let DEXTALITY = null
let CONSTITUTION = null
let INTELLIGENCE = null
let WISDOM = null
let CHARISMA = null

export default class AbilityType {
  constructor (name) {
    // 名称
    this.name = name
  }

  static get STRENGTH () {
    if (STRENGTH == null) {
      STRENGTH = new AbilityType('筋力')
    }
    return STRENGTH
  }
  static get DEXTALITY () {
    if (DEXTALITY == null) {
      DEXTALITY = new AbilityType('敏捷')
    }
    return DEXTALITY
  }
  static get CONSTITUTION () {
    if (CONSTITUTION == null) {
      CONSTITUTION = new AbilityType('耐久')
    }
    return CONSTITUTION
  }
  static get INTELLIGENCE () {
    if (INTELLIGENCE == null) {
      INTELLIGENCE = new AbilityType('知力')
    }
    return INTELLIGENCE
  }
  static get WISDOM () {
    if (WISDOM == null) {
      WISDOM = new AbilityType('判断')
    }
    return WISDOM
  }
  static get CHARISMA () {
    if (CHARISMA == null) {
      CHARISMA = new AbilityType('魅力')
    }
    return CHARISMA
  }
}
