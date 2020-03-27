
/**呪文タグクラス。 */
export default class Tag{
  constructor(){
    this.name = "";
    this.spellnames = [];
  }

  addSpellName(spellname){
    this.spellnames.push(spellname)
  }

  removeSpellName(spellname){
    const index= this.spellnames.indexOf(spellname);
    if(index >= 0){
      this.spellnames.splice(index,1);
    }
  }

  contains(spellname){
    return this.spellnames.some(item=>{return item === spellname});
  }

  static save(tags){
    const json = JSON.stringify(tags);
    localStorage.setItem("dndapp.spelltags", json);
  }

  static load(){
    const json = localStorage.getItem("dndapp.spelltags");
    if(!json){
      return [];
    }else{
      return Tag.assigns(JSON.parse(json));
    }
  }

  get self(){
    return this;
  }

  //**Spellsインスタンスを生成するヘルパーメソッド */
  // オブジェクトの配列を指定し、Spellsインスタンスの配列に変換する。
  static assigns(array){
    var retVal = [];
    array.forEach(obj => {
      retVal.push(Tag.assign(obj));
    });
    return retVal;
  }

  // オブジェクトを指定し、Spellsインスタンスに変換する。
  static assign(obj){
    var spell = new Tag()
    Object.assign(spell,obj);
    return spell;
  }

}
