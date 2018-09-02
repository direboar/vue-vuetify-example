// import abilityType from './abilityType'
export default class Constants {
  static get classes() {
    return [
      { text: "ウィザード", value: "Wizard" },
      { text: "ウォーロック", value: "Warlock" },
      { text: "クレリック", value: "Cleric" },
      { text: "ソーサラー", value: "Sorcerer" },
      { text: "ドルイド", value: "Druid" },
      { text: "バード", value: "Bard" },
      { text: "パラディン", value: "Paladin" },
      { text: "レンジャー", value: "Ranger" }
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
      { text: "動作", value: "S" },
      { text: "音声", value: "V" },
      { text: "物質", value: "M" }
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
      { text: "ー", value: null },
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

  static get casting_time() {
    return [
      { text: "ー", value: null },
      { text: "1ボーナスアクション", value: "1ボーナスアクション" },
      { text: "1アクション", value: "1アクション" }, 
      { text: "1リアクション", value: "1リアクション" }, 
      { text: "その他", value: "その他" }, 
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
