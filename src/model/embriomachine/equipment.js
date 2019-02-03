// import abilityType from './abilityType'
import MountPosition from '@/model/embriomachine/mountposition'

export default class Equipment {

  constructor(name,rank,type,range,damage,damageType,mountPosition,minLimit,equipSamePosition,effect,maxLimit) {
    // 名前
    this.name = name
    // ランク A,B
    this.rank = rank
    // 種別 射撃、白兵、機雷、その他、補助
    this.type = type
    // 射程 1,3～4,➀～➁,➍～➏
    this.range = range
    // ダメージ
    this.damage = damage
    // ダメージタイプ
    this.damageType = damageType
    // 搭載可能部位
    this.mountPosition = mountPosition
    // 最低枚数
    this.minLimit = minLimit
    // 同じ部位に装備する必要があるか
    this.equipSamePosition = equipSamePosition
    // 効果
    this.effect = effect
    // （上限）枚数
    this.maxLimit = maxLimit
  }

  get formatMinLimit(){
    if(this.equipSamePosition){
      return this.minLimit;
    }else{
      //FIXME とりあえず３まで対応
      if(this.minLimit === 1){
        return "①";
      }
      if(this.minLimit === 2){
        return "②";
      }
      if(this.minLimit === 3){
        return "③";
      }else{
        return this.minLimit;
      }
    }
  }

  //指定した部位に装備できるかを判定する。
  canEquip(equipmentPosition){
    //2-1.装備品の装備可能部位から、装備可能なポジションのリストを取得し、装備可能な位置に装備しているかをチェック。
   let machineEquipmentPositions = MountPosition.toMachineEquipmentPosition(this.mountPosition);
   if(machineEquipmentPositions.indexOf(equipmentPosition) < 0){
      return false;
    }
    return true;
  }

  //選択可能な装備を取得する
  static getEquipments(){
    return Equipment.assigns(Equipment.json());
  }

  static assigns(array){
    var retVal = [];
    array.forEach(obj => {
      var equipment = new Equipment()
      Object.assign(equipment,obj);
      retVal.push(equipment);
    });
    return retVal;

  }

  static json(){
    return [
      {
        "name":"スモールレーザー",
        "rank":"B",
        "type":"射撃武器",
        "range":"②～③",
        "damage":"2",
        "damageType":"射撃・レーザー",
        "mountPosition":"全部位",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"",
        "maxLimit":4
       },
       {
        "name":"ミドルレーザー",
        "rank":"B",
        "type":"射撃武器",
        "range":"③～④",
        "damage":"3",
        "damageType":"射撃・レーザー",
        "mountPosition":"頭×",
        "minLimit":2,
        "equipSamePosition":false,
        "effect":"",
        "maxLimit":13
       },
       {
        "name":"ラージレーザー",
        "rank":"B",
        "type":"射撃武器",
        "range":"④～⑤",
        "damage":"3",
        "damageType":"射撃・レーザー",
        "mountPosition":"頭×",
        "minLimit":2,
        "equipSamePosition":false,
        "effect":"",
        "maxLimit":8
       },
       {
        "name":"バルカン",
        "rank":"B",
        "type":"射撃武器",
        "range":"②",
        "damage":"1",
        "damageType":"射撃・実弾兵器",
        "mountPosition":"全部位",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"移動タイミングの開始時の射撃できる。<br/>命中した場合、この武装は破壊される。",
        "maxLimit":2
       },
       {
        "name":"マシンガン",
        "rank":"B",
        "type":"射撃武器",
        "range":"②～④",
        "damage":"3",
        "damageType":"射撃・実弾兵器",
        "mountPosition":"全部位",
        "minLimit":2,
        "equipSamePosition":true,
        "effect":"",
        "maxLimit":4
       },
       {
        "name":"ガトリングガン",
        "rank":"B",
        "type":"射撃武器",
        "range":"③～⑤",
        "damage":"3",
        "damageType":"射撃・実弾兵器",
        "mountPosition":"全部位",
        "minLimit":2,
        "equipSamePosition":true,
        "effect":"",
        "maxLimit":2
       },
       {
        "name":"スナイパーライフル",
        "rank":"B",
        "type":"射撃武器",
        "range":"⑨～⑪",
        "damage":"3",
        "damageType":"射撃・実弾兵器",
        "mountPosition":"全部位",
        "minLimit":2,
        "equipSamePosition":true,
        "effect":"",
        "maxLimit":3
       },
       {
        "name":"短距離ミサイル",
        "rank":"B",
        "type":"射撃武器",
        "range":"❺～❻",
        "damage":"3",
        "damageType":"射撃・実弾兵器",
        "mountPosition":"全部位",
        "minLimit":2,
        "equipSamePosition":true,
        "effect":"射線が通っていなくても射撃できる",
        "maxLimit":5
       },
       {
        "name":"長距離ミサイル",
        "rank":"B",
        "type":"射撃武器",
        "range":"❽～❾",
        "damage":"3",
        "damageType":"射撃・実弾兵器",
        "mountPosition":"全部位",
        "minLimit":2,
        "equipSamePosition":true,
        "effect":"射線が通っていなくても射撃できる",
        "maxLimit":5
       },
       {
        "name":"ロケット砲",
        "rank":"B",
        "type":"射撃武器",
        "range":"6～8",
        "damage":"4",
        "damageType":"射撃・実弾兵器",
        "mountPosition":"全部位",
        "minLimit":2,
        "equipSamePosition":true,
        "effect":"",
        "maxLimit":5
       },
       {
        "name":"アンカー",
        "rank":"B",
        "type":"射撃武器",
        "range":"1～3",
        "damage":"0",
        "damageType":"射撃",
        "mountPosition":"全部位",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"射撃の前に期待の向きを変更できる。<br/>対象を時期の正面に移動させる。その際、対象の向きは変わらない。",
        "maxLimit":1
       },
       {
        "name":"クロー",
        "rank":"B",
        "type":"白兵武器",
        "range":"1",
        "damage":"2",
        "damageType":"白兵",
        "mountPosition":"腕・脚",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"（ダメージ適用前）対象の手札または補助、プロットエリアに種別「装甲」のカードがある場合、対象はそのうち２枚を選択し、破壊する。",
        "maxLimit":2
       },
       {
        "name":"ブレード",
        "rank":"B",
        "type":"白兵武器",
        "range":"1～2",
        "damage":"3",
        "damageType":"白兵",
        "mountPosition":"全部位",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"",
        "maxLimit":1
       },
       {
        "name":"ランス",
        "rank":"B",
        "type":"白兵武器",
        "range":"2～3",
        "damage":"3",
        "damageType":"白兵",
        "mountPosition":"腕",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"",
        "maxLimit":2
       },
       {
        "name":"アクス",
        "rank":"B",
        "type":"白兵武器",
        "range":"2",
        "damage":"4",
        "damageType":"白兵",
        "mountPosition":"腕",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"",
        "maxLimit":2
       },
       {
        "name":"メイス",
        "rank":"B",
        "type":"白兵武器",
        "range":"1",
        "damage":"4",
        "damageType":"白兵",
        "mountPosition":"腕",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"",
        "maxLimit":1
       },
       {
        "name":"ヒートソード",
        "rank":"B",
        "type":"白兵武器",
        "range":"1～2",
        "damage":"3",
        "damageType":"白兵",
        "mountPosition":"全部位",
        "minLimit":2,
        "equipSamePosition":false,
        "effect":"",
        "maxLimit":6
       },
       {
        "name":"パイルバンカー",
        "rank":"B",
        "type":"白兵武器",
        "range":"1",
        "damage":"6",
        "damageType":"白兵",
        "mountPosition":"全部位",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"命中した場合、この武器は破壊される",
        "maxLimit":4
       },
       {
        "name":"陸上機雷",
        "rank":"B",
        "type":"機雷",
        "range":"-",
        "damage":"3",
        "damageType":"白兵",
        "mountPosition":"全部位",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"自機の周囲８マスに陸上機雷トークン２枚とダミートークン２枚を重ならないように配置する<br/>各タイミングの終了時に機体がトークン上に存在するか否かを確認する。存在する場合、そのトークンをオープンする。嫌いだった場合はダメージを適用し、トークンを取り除く。",
        "maxLimit":2
       },
       {
        "name":"スパイク",
        "rank":"B",
        "type":"突撃",
        "range":"1",
        "damage":"X",
        "damageType":"白兵",
        "mountPosition":"全部位",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"正面方向へ可能な限り（最大で移動値マス）直線移動する。<br/>正面に隣接する機体に対し、「自機の突撃ダメージ＋１」点、自機に「対象の火突撃ダメージー１」点の白兵ダメージを与える。",
        "maxLimit":2
       },
       {
        "name":"シールド",
        "rank":"B",
        "type":"装甲",
        "range":"-",
        "damage":"-",
        "damageType":"-",
        "mountPosition":"全部位",
        "minLimit":1,
        "equipSamePosition":true,
        "effect":"手札にこの武装がある場合、破壊することで射撃ダメージを４点まで防げる。<br/>この武装がプロットエリアにある場合、上記をすべての種類のダメージに対して適用できる。",
        "maxLimit":3
       },
       {
        "name":"バーニア",
        "rank":"B",
        "type":"補助",
        "range":"-",
        "damage":"-",
        "damageType":"-",
        "mountPosition":"胴２ or 脚各１",
        "minLimit":2,
        "equipSamePosition":false,
        "effect":"１枚では使用不可。突撃には使用不可。<br/>移動、白兵時に高低差を１少ないものとして扱い、特殊地形への侵入に必要な移動力を無視できる。",
        "maxLimit":12
       },
       {
        "name":"ホイール",
        "rank":"B",
        "type":"補助",
        "range":"-",
        "damage":"-",
        "damageType":"-",
        "mountPosition":"脚各１",
        "minLimit":2,
        "equipSamePosition":false,
        "effect":"１枚では使用不可。白兵には使用不可。<br/>移動、突撃時に移動力を＋２できる。",
        "maxLimit":4
       },
       {
        "name":"キャタピラ",
        "rank":"B",
        "type":"補助",
        "range":"-",
        "damage":"-",
        "damageType":"-",
        "mountPosition":"脚各１",
        "minLimit":2,
        "equipSamePosition":false,
        "effect":"１枚では使用不可。白兵には使用不可。<br/>移動、突撃時に移動力を＋１し、瓦礫、砂地、水地への侵入に必要な追加移動力を無視できる。",
        "maxLimit":2
       },
       {
        "name":"ムーブセンサー",
        "rank":"B",
        "type":"補助",
        "range":"-",
        "damage":"-",
        "damageType":"-",
        "mountPosition":"頭１＆胴１",
        "minLimit":2,
        "equipSamePosition":false,
        "effect":"１枚では使用不可。バーニアと同時に使用できる。<br/>白兵攻撃直前に１マス移動できる。",
        "maxLimit":2
       },
      ]
    }
}

