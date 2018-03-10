// import abilityType from './abilityType'
export default class Constants {
  static get classes() {
    return [
      { text: "バード", value: "Bard" },
      { text: "クレリック", value: "Cleric" },
      { text: "ドルイド", value: "Druid" },
      { text: "パラディン", value: "Paladin" },
      { text: "レンジャー", value: "Ranger" },
      { text: "ソーサラー", value: "Sorcerer" },
      { text: "ウィザード", value: "Wizard" },
      { text: "ウォーロック", value: "Warlock" }
    ];
  }

  static get rituals() {
    return [
      { text: "可", value: "yes" },
      { text: "不可", value: "no" }
    ];
  }

  static get components() {
    return [
      { text: "動作(S)", value: "S" },
      { text: "音声(V)", value: "V" },
      { text: "物質(M)", value: "M" }
    ];
  }

  static get concentration() {
    return [
      { text: "あり", value: "yes" }, 
      { text: "なし", value: "no" }
    ];
  }

  static get schools() {
    return [
      { text: "幻術", value: "Illusion" }, 
      { text: "召喚術", value: "Conjuration" },
      { text: "死霊術", value: "Necromancy" },
      { text: "心術", value: "Enchantment" },
      { text: "占術", value: "Divination" },
      { text: "変成術", value: "Transmutation" },
      { text: "防御術", value: "Abjuration" },
      { text: "力術", value: "Evocation" },
    ];
  }

  static get levels() {
    return [
      "Cantrip",
      "1st-level",
      "2nd-level",
      "3rd-level",
      "4th-level",
      "5th-level",
      "6th-level",
      "7th-level",
      "8th-level",
      "9th-level"
    ]
  }
}
