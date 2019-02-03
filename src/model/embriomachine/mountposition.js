import MachineType from '@/model/embriomachine/machinetype'

export default class MountPosition {
  //全部位
  static get ALL(){
    return "全部位";
  }
  //腕
  static get ARM(){
    return "腕";
  }
  //脚
  static get LEG(){
    return "脚";
  }
  //腕・脚
  static get ARM_OR_LEG(){
    return "腕・脚";
  }
  //脚各１
  static get LEG_EACH_ONE(){
    return "脚各１";
  }
  //頭×
  static get WITHOUT_HEAD(){
    return "頭×";
  }
  //胴２or脚各１
  static get BODY_TWO_OR_LEG_EACH_ONE(){
    return "胴２ or 脚各１";
  }
  //頭１＆胴１
  static get HEAD_AND_BODY_EACH_ONE(){
    return "頭１＆胴１";
  }
  //装備数上限なし
  static get INFINITY(){
    return 99;
  }

  //マシンの装備可能位置リストに変換する。
  static toMachineEquipmentPosition(mountPosition){
    if(mountPosition === MountPosition.ALL){
      return [MachineType.POSITION_HEAD,MachineType.POSITION_BODY,MachineType.POSITION_LEFTARM,MachineType.POSITION_RIGHTARM,MachineType.POSITION_LEFTLEG,MachineType.POSITION_RIGHTLEG];
    }
    if(mountPosition === MountPosition.ARM){
      return [MachineType.POSITION_LEFTARM,MachineType.POSITION_RIGHTARM];
    }
    if(mountPosition === MountPosition.LEG || mountPosition === MountPosition.LEG_EACH_ONE){
      return [MachineType.POSITION_LEFTLEG,MachineType.POSITION_RIGHTLEG];
    }
    if(mountPosition === MountPosition.ARM_OR_LEG){
      let ret = MountPosition.toMachineEquipmentPosition(MountPosition.ARM);
      ret = ret.concat(MountPosition.toMachineEquipmentPosition(MountPosition.LEG))
      return ret;
    }
    if(mountPosition === MountPosition.WITHOUT_HEAD){
      let ret = MountPosition.toMachineEquipmentPosition(MountPosition.ALL);
      ret.splice(ret.indexOf(MachineType.POSITION_HEAD),1)
      return ret;
    }
    if(mountPosition === MountPosition.BODY_TWO_OR_LEG_EACH_ONE){
      return [MachineType.POSITION_BODY,MachineType.POSITION_LEFTLEG,MachineType.POSITION_RIGHTLEG];
    }
    if(mountPosition === MountPosition.HEAD_AND_BODY_EACH_ONE){
      return [MachineType.POSITION_HEAD,MachineType.POSITION_BODY];
    }
    return [];
  }
}
