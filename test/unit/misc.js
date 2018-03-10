class Spell {
    constructor(name,desc,higher_level,page,range,components,ritual,duration,concentration,casting_time,level,school,pClass){
      this.name = name;
      this.desc = desc;
      this.higher_level = higher_level;
      this.page = page;
      this.range = range;
      this.components = components;
      this.ritual = ritual;
      this.duration = duration;
      this.concentration = concentration;
      this.casting_time = casting_time;
      this.level = level;
      this.school = school;
      this.class = pClass
    }

    get hoge(){
        return this.name + "hoge"
    }

    static deserialize(json){
        var obj = JSON.parse(json)
        var spell = new Spell()
        Object.assign(spell,obj);
        return spell;
    }
}

var json ="{\"name\":\"ウィッシュ\",\"desc\":\"1\",\"page\":\"phb288\",\"range\":\"自身\",\"components\":[\"V\"],\"ritual\":\"no\",\"duration\":\"瞬間\",\"concentration\":\"no\",\"casting_time\":\"1アクション\",\"level\":\"9th-level\",\"school\":\"Conjuration\",\"class\":[\"Sorcerer\",\"Wizard\"]}"
//console.log(json);


var restored = Spell.deserialize(json)
console.log(restored.name)
console.log(restored.hoge)

