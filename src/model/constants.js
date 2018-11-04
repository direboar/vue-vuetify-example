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

  static get subclassses() {
    return [
      { text: "ウォーロック：アーチフェイ", value: "Warlock:Archfey" },
      { text: "ウォーロック：フィーンド", value: "Warlock:Fiend" },
      { text: "ウォーロック：グレート・オールド・ワン", value: "Warlock:GreatOldOne" },
      { text: "ウォーロック：アンダイイング", value: "Warlock:Undying" },
      { text: "クレリック:欺きの領域", value: "Cleric:Trickery Domain" },
      { text: "クレリック:嵐の領域", value: "Cleric:Tempest Domain" },
      { text: "クレリック:戦の領域", value: "Cleric:War Domain" },
      { text: "クレリック:自然の領域", value: "Cleric:Nature Domain" },
      { text: "クレリック:生命の領域", value: "Cleric:Life Domain" },
      { text: "クレリック:知識の領域", value: "Cleric:Knowledge Domain" },
      { text: "クレリック:光の領域", value: "Cleric:Light Domain" },
      { text: "クレリック:秘術の領域", value: "Cleric:Arcana Domain" },
      { text: "ドルイド:土地の円環:アンダーダーク", value: "Druid:Circle of the Land:Underdark" },
      { text: "ドルイド:土地の円環:海岸", value: "Druid:Circle of the Land:Coast" },
      { text: "ドルイド:土地の円環:極地", value: "Druid:Circle of the Land:Arctic" },
      { text: "ドルイド:土地の円環:砂漠", value: "Druid:Circle of the Land:Desert" },
      { text: "ドルイド:土地の円環:山岳", value: "Druid:Circle of the Land:Mountain" },
      { text: "ドルイド:土地の円環:湿地", value: "Druid:Circle of the Land:Swamp" },
      { text: "ドルイド:土地の円環:森林", value: "Druid:Circle of the Land:Forest" },
      { text: "ドルイド:土地の円環:草原", value: "Druid:Circle of the Land:Grassland" },
      { text: "パラディン:献身の誓い", value: "Paladin:Oath of Devotion" },
      { text: "パラディン:古き者の誓い", value: "Paladin:Oath of the Ancients" },
      { text: "パラディン:復讐の誓い", value: "Paladin:Oath of Vengeance" },
      { text: "パラディン:鎮護の誓い", value: "Paladin:Oath of the Crown" }
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
      { text: "ー", value: null },
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

