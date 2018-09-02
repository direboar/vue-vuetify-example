
/**呪文データクラス。 */
export default class Spell {
  constructor(){
    this.name = "";
    this.desc = "";
    this.higher_level = "";
    this.page = "";
    this.range = "";
    this.components = [];
    this.materialdeteil = ""
    this.ritual = "";
    this.duration = "";
    this.concentration = "";
    this.casting_time = "";
    this.level = "";
    this.school = "";
    this.class = [];
    this.subclass = "";
  }

  /**精神集中の画面表示文字列生成 */
  get formatDuration(){
    var retVal = this.duration;
    if (this.concentration === "yes") {
      retVal = "精神集中," + retVal;
    }
    return retVal;
  }

  /** utils. */
  //値を表示用の文字列にマッピングする。val:値 table：キーがvalueｍ表示の値がtextであるオブジェクトのリスト。
  format(val, table) {
    var retVal = val;
    table.forEach(element => {
      if (element.value === val) {
        retVal = element.text;
        return;
      }
    });
    return retVal;
  }

  //配列のデータを表示用文字列にマッピングする。
  formatArray(val, table) {
    var array = [];
    val.forEach(element => {
      array.push(this.format(element, table));
    });
    return array.join(",");
  }

  //**Spellsインスタンスを生成するヘルパーメソッド */
  // オブジェクトの配列を指定し、Spellsインスタンスの配列に変換する。
  static assigns(array){
    var retVal = [];
    array.forEach(obj => {
      retVal.push(Spell.assign(obj));
    });
    return retVal;
  }

  // オブジェクトを指定し、Spellsインスタンスに変換する。
  static assign(obj){
    var spell = new Spell()
    Object.assign(spell,obj);
    return spell;
  }

}
