export default class MachineType {
    //頭
    static get POSITION_HEAD(){
      return "頭";
    }
    //胴
    static get POSITION_BODY(){
      return "胴";
    }
    //右腕
    static get POSITION_RIGHTARM(){
      return "右腕";
    }
    //左腕
    static get POSITION_LEFTARM(){
      return "左腕";
    }
    //右脚
    static get POSITION_RIGHTLEG(){
      return "右脚";
    }
    //左脚
    static get POSITION_LEFTLEG(){
      return "左脚";
    }
    
    static getPositionConst(){
      return {
        POSITION_HEAD : MachineType.POSITION_HEAD,
        POSITION_BODY : MachineType.POSITION_BODY,
        POSITION_RIGHTARM : MachineType.POSITION_RIGHTARM,
        POSITION_LEFTARM : MachineType.POSITION_LEFTARM,
        POSITION_RIGHTLEG : MachineType.POSITION_RIGHTLEG,
        POSITION_LEFTLEG : MachineType.POSITION_LEFTLEG
      }
    }
  constructor(name,movility,evadeRate,armorPoint,constitution,initiative,headSlot,bodySlot,leftArmSlot,rightArmSlot,leftLegSlot,rightLegSlot) {
    // 名前
    this.name = name
    // 移動力
    this.movility = movility
    // 回避値
    this.evadeRate = evadeRate
    // 装甲値
    this.armorPoint = armorPoint
    // 耐久値
    this.constitution = constitution
    // イニシアチブ
    this.initiative = initiative

    this.slots = {};
    // // スロット（頭）
    this.slots[MachineType.POSITION_HEAD]=headSlot
    // スロット（胴）
    this.slots[MachineType.POSITION_BODY]=bodySlot
    // スロット（右腕）
    this.slots[MachineType.POSITION_RIGHTARM]=leftArmSlot
    // スロット（左腕）
    this.slots[MachineType.POSITION_LEFTARM]=rightArmSlot
    // スロット（右足）
    this.slots[MachineType.POSITION_RIGHTLEG]=leftLegSlot
    // スロット（左足）
    this.slots[MachineType.POSITION_LEFTLEG]=rightLegSlot
  }

  getSlot(position){
    return this.slots[position];
  }

  getTotalSlot(){
    let ret = 0;
    for(let slot in this.slots){
      ret += this.slots[slot];
    }
    return ret;
  }
 
  get headSlot(){
    return this.getSlot(MachineType.POSITION_HEAD)
  }

  get bodySlot(){
    return this.getSlot(MachineType.POSITION_BODY)
  }

  get rightArmSlot(){
    return this.getSlot(MachineType.POSITION_RIGHTARM)
  }

  get leftArmSlot(){
    return this.getSlot(MachineType.POSITION_LEFTARM)
  }

  get rightLegSlot(){
    return this.getSlot(MachineType.POSITION_RIGHTLEG)
  }

  get leftLegSlot(){
    return this.getSlot(MachineType.POSITION_LEFTLEG)
  }

  static getDefaultMachineType(){
    return MachineType.getMachineTypes()[0];
  }
  
  //選択可能なマシンタイプを取得する
  static getMachineTypes(){
    let ret = []

    ret.push(new MachineType("軽・サイズSS",7,10,0,17,1,1,1,2,2,1,1))
    ret.push(new MachineType("軽・サイズS",7,9,0,18,2,1,2,2,2,1,1))
    ret.push(new MachineType("軽・サイズM",6,8,0,19,3,1,2,2,2,2,2))
    ret.push(new MachineType("軽・サイズL",5,7,0,20,6,1,2,3,3,2,2))
    ret.push(new MachineType("軽・サイズLL",4,7,0,21,10,2,2,3,3,2,2))

    ret.push(new MachineType("中・サイズSS",6,8,3,19,4,1,1,2,2,1,1))
    ret.push(new MachineType("中・サイズS",6,7,3,20,5,1,2,2,2,1,1))
    ret.push(new MachineType("中・サイズM",5,6,3,21,7,1,2,2,2,2,2))
    ret.push(new MachineType("中・サイズL",4,5,3,22,11,1,2,3,3,2,2))
    ret.push(new MachineType("中・サイズLL",3,5,3,23,13,2,2,3,3,2,2))

    ret.push(new MachineType("重・サイズSS",5,6,6,21,8,1,1,2,2,1,1))
    ret.push(new MachineType("重・サイズS",5,5,6,22,9,1,2,2,2,1,1))
    ret.push(new MachineType("重・サイズM",4,4,6,23,12,1,2,2,2,2,2))
    ret.push(new MachineType("重・サイズL",3,3,6,24,14,1,2,3,3,2,2))
    ret.push(new MachineType("重・サイズLL",2,3,6,25,15,2,2,3,3,2,2))

    return ret;
  }

}
