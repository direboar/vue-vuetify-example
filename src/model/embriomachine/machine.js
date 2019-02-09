import MachineType from '@/model/embriomachine/machinetype'
import MountPosition from '@/model/embriomachine/mountposition'
import Equipment from "@/model/embriomachine/equipment";

export default class Machine {
    
  constructor(name,machineType) {
    // 名前
    this.name = name
    // 移動力
    if(machineType === null || machineType === undefined){
      this.machineType = new MachineType("")
    }else{
      this.machineType = machineType
    }
    // 装備
    this.equipments = {}
    this.equipments[MachineType.POSITION_HEAD] = []
    this.equipments[MachineType.POSITION_BODY] = []
    this.equipments[MachineType.POSITION_RIGHTARM] = []
    this.equipments[MachineType.POSITION_LEFTARM] = []
    this.equipments[MachineType.POSITION_RIGHTLEG] = []
    this.equipments[MachineType.POSITION_LEFTLEG] = []
  }

  setLastUpdateTime(lastUpdateTime){
    this.lastUpdateTime = lastUpdateTime;
  }

  getLastUpdateTime(){
    return this.lastUpdateTime;
  }

  setId(id){
    this.id = id;
  }

  getId(){
    return this.id;
  }

  setUserIdAndUserName(userId,userName){
    this.userId = userId;
    this.userName = userName;
  }

  addEquipment(position,equipment){
    let equipments = this.equipments[position];
    if(equipments === undefined){
      throw new Error("equipmentsが取得できない")
    }

    equipments.push(equipment)
  }

  deleteEquipment(position,equipment){
    let index = this.equipments[position].indexOf(equipment);
    if(index >= 0){
      this.equipments[position].splice(index,1)
    }
  }

  getEquipment(position,index){
    let equipments = this.equipments[position];
    if(equipments.length > index){
      return equipments[index];
    }
    return new Equipment("");//dummpy
  }

  //firebaseに永続化する際のオブジェクトに変換する。
  toRealtimeDatabaseObject(){
    let equipments ={};
    equipments[MachineType.POSITION_HEAD] = []
    equipments[MachineType.POSITION_BODY] = []
    equipments[MachineType.POSITION_RIGHTARM] = []
    equipments[MachineType.POSITION_LEFTARM] = []
    equipments[MachineType.POSITION_RIGHTLEG] = []
    equipments[MachineType.POSITION_LEFTLEG] = []

    this.equipmentToRealtimeDatabaseObject(equipments,MachineType.POSITION_HEAD);
    this.equipmentToRealtimeDatabaseObject(equipments,MachineType.POSITION_BODY);
    this.equipmentToRealtimeDatabaseObject(equipments,MachineType.POSITION_RIGHTARM);
    this.equipmentToRealtimeDatabaseObject(equipments,MachineType.POSITION_LEFTARM);
    this.equipmentToRealtimeDatabaseObject(equipments,MachineType.POSITION_RIGHTLEG);
    this.equipmentToRealtimeDatabaseObject(equipments,MachineType.POSITION_LEFTLEG);

    return {
      name : this.name,
      machineType : this.machineType.name,
      equipments : equipments,
      lastUpdateTime : this.lastUpdateTime,
      userId : this.userId,
      userName : this.userName,
    }
  }

  equipmentToRealtimeDatabaseObject(equipments,positon){
    this.equipments[positon].forEach(item=>{
      equipments[positon].push(item.name)
    });
  }

   // //ソート用項目 更新時間の降順ソートとしたいが、realtime databaseの仕様上、降順ソートをサポートしていないための措置。
   get orderBy(){
      return 9999999999999 - this.lastUpdateTime;
   }

   static getOrderBy(realtimeDatabaseObject){
     return 9999999999999 - realtimeDatabaseObject.lastUpdateTime
   }

  static fromRealtimeDatabaseObject(key,data){
    let filtered = MachineType.getMachineTypes().filter(item =>{
      return item.name === data.machineType
    });

    let machineType = null;
    if(filtered.length > 0){
      machineType = filtered[0];
    }

    let machine = new Machine(data.name,machineType);
    machine.equipmentFromRealtimeDatabaseObject(data,MachineType.POSITION_HEAD);
    machine.equipmentFromRealtimeDatabaseObject(data,MachineType.POSITION_BODY);
    machine.equipmentFromRealtimeDatabaseObject(data,MachineType.POSITION_RIGHTARM);
    machine.equipmentFromRealtimeDatabaseObject(data,MachineType.POSITION_LEFTARM);
    machine.equipmentFromRealtimeDatabaseObject(data,MachineType.POSITION_RIGHTLEG);
    machine.equipmentFromRealtimeDatabaseObject(data,MachineType.POSITION_LEFTLEG);

    machine.setLastUpdateTime(new Date(data.lastUpdateTime));
    machine.setId(key)
    machine.setUserIdAndUserName(data.userId,data.userName)
    return machine;
  }

  equipmentFromRealtimeDatabaseObject(firebaseObject,positon){
    let array = [];
    if(firebaseObject.equipments !==undefined && firebaseObject.equipments[positon] !== undefined){
      firebaseObject.equipments[positon].forEach(item=>{
        let filtered = Equipment.getEquipments().filter(equipment =>{
          return item === equipment.name;
        });
        if(filtered.length > 0){
          array.push(filtered[0]);
        }
      });
    }
    this.equipments[positon] = array;
  }

// １．装備合計数チェック
// ２．装備の種類ごとに以下のチェック
// ➀装備が指定された部位に装備されている
// ➁装備の最低装備枚数を満たしている
// ➁－１〇ではない場合：１か所の部位に裁定枚数が装備されている
// ➁－２〇である場合：装備可能部位全体で最低枚数が装備されている
// 枚数上限チェック
// 特殊チェック
// ・足各１
// ・頭・胴各１
// ・胴２or足各１

  validate(){
    let errors = []
    //1.装備可能数合計チェック
    //各スロットごとのスロット上限を超えていないこと
    this.validateSlotSize(MachineType.POSITION_HEAD,errors);
    this.validateSlotSize(MachineType.POSITION_BODY,errors);
    this.validateSlotSize(MachineType.POSITION_LEFTARM,errors);
    this.validateSlotSize(MachineType.POSITION_RIGHTARM,errors);
    this.validateSlotSize(MachineType.POSITION_LEFTLEG,errors);
    this.validateSlotSize(MachineType.POSITION_RIGHTLEG,errors);

    //2.装備の種類ごとにチェック
    for(let equipmentPosition in this.equipments){
      let equipments = this.equipments[equipmentPosition];

      equipments.forEach(equipment => {
        let machineEquipmentPositions = MountPosition.toMachineEquipmentPosition(equipment.mountPosition);
        //2-1.装備品の装備可能部位から、装備可能なポジションのリストを取得し、装備可能な位置に装備しているかをチェック。
        if(!equipment.canEquip(equipmentPosition)){
          errors.push(equipment.name + "は" + equipmentPosition + "には装備できません。")
        }

        //2-2.装備の最低装備枚数を満たしている
        if(equipment.equipSamePosition){
          //2-2-1.〇ではない場合：１か所の部位に裁定枚数が装備されている
          //現在装備している部位の、該当装備品の数をカウントする。
          let count = this.getEquipmentCountOf([equipmentPosition],equipment)
          if(count < equipment.minLimit){
            errors.push(equipment.name + "は" + equipmentPosition + "に" + equipment.minLimit +"個以上装備しなければなりません。")
          }
        }else{
          //2-2-2.〇である場合：装備可能部位全体で最低枚数が装備されている
          let count = this.getEquipmentCountOf(machineEquipmentPositions,equipment)
          if(count < equipment.minLimit){
            errors.push(equipment.name + "は" + machineEquipmentPositions.join() + "に合計で" + equipment.minLimit +"個以上装備しなければなりません。")
          }
        }

        //枚数上限チェック
        let totalCount = this.getEquipmentCount(equipment);
        if(totalCount > equipment.maxLimit){
          errors.push(equipment.name + "は" + equipment.maxLimit+"個以上装備できません。")
        }

        //3.特殊チェック
        //脚各１
        if(equipment.mountPosition === MountPosition.LEG_EACH_ONE){
          let rightLegCount = this.getEquipmentCountOf([MachineType.POSITION_RIGHTLEG],equipment) ;
          let leftLegCount = this.getEquipmentCountOf([MachineType.POSITION_LEFTLEG],equipment) ;
          if(rightLegCount !== 1 || leftLegCount !== 1){
            errors.push(equipment.name + "は" + machineEquipmentPositions.join() +"にそれぞれ一つずつ装備しなければなりません。")
          }
        }
        //胴２or脚各１
        if(equipment.mountPosition === MountPosition.BODY_TWO_OR_LEG_EACH_ONE){
          let bodyCount = this.getEquipmentCountOf([MachineType.POSITION_BODY],equipment) ;
          let rightLegCount = this.getEquipmentCountOf([MachineType.POSITION_RIGHTLEG],equipment) ;
          let leftLegCount = this.getEquipmentCountOf([MachineType.POSITION_LEFTLEG],equipment) ;
          if(bodyCount === 2 && rightLegCount === 0 && leftLegCount === 0){
            //ok
          }else if(bodyCount === 0 && rightLegCount === 1 && leftLegCount === 1){
            //ok
          }else{
            errors.push(equipment.name + "は" + MachineType.POSITION_BODY +"に２つ、もしくは" + MachineType.POSITION_RIGHTLEG + "," + MachineType.POSITION_LEFTLEG + "にそれぞれ一つずつ装備しなければなりません。")
          }
        }
        //頭１＆胴１
        if(equipment.mountPosition === MountPosition.HEAD_AND_BODY_EACH_ONE){
          let headCount = this.getEquipmentCountOf([MachineType.POSITION_HEAD],equipment) ;
          let bodyCount = this.getEquipmentCountOf([MachineType.POSITION_BODY],equipment) ;
          if(headCount !== 1 || bodyCount !== 1){
            errors.push(equipment.name + "は" + machineEquipmentPositions.join() +"にそれぞれ一つずつ装備しなければなりません。")
          }
        }
      });
    }

    //メッセージの重複を削除して返却
    //see https://qiita.com/cocottejs/items/7afe6d5f27ee7c36c61f
    return errors.filter((elem,index,array)=>array.indexOf(elem) === index)
  }
  
  //指定したポジションのスロット上限チェックを行います。
  validateSlotSize(machineTypePosition,errors){
    let alreadyEquipmentCount = this.getEquipmentCountOf([machineTypePosition]);
    if(alreadyEquipmentCount > this.machineType.getSlot(machineTypePosition)){
      errors.push(machineTypePosition +"のスロット合計以上装備しています。");
    }
  }

  //全ての装備個所の装備数を取得する。
  //第１引数：装備（指定なしの場合は、装備かかわらずカウントする）
  getEquipmentCount(targetEquipment){
    return this.getEquipmentCountOf(MountPosition.toMachineEquipmentPosition(MountPosition.ALL),targetEquipment)
  }
  
  //指定した装備個所（配列指定）の装備数を取得する。
  //第一引数：装備個所
  //第二引数：装備（指定なしの場合は、装備かかわらずカウントする）
  getEquipmentCountOf(targetEquipmentPositions,targetEquipment){
    let ret = 0;
    for(let equipmentPosition in this.equipments){
      if(targetEquipmentPositions.indexOf(equipmentPosition) > -1){
        if(targetEquipment == null){
          ret += this.equipments[equipmentPosition].length;
        }else{
          ret += this.equipments[equipmentPosition].filter(
            equipments => equipments.name === targetEquipment.name
          ).length
        }
      }
    }
    return ret;
  }

  static assign(obj){
    let machine = new Machine();
    Object.assign(machine,obj);

    let machineType = new MachineType();
    Object.assign(machineType,obj.machineType);
    machine.machineType = machineType;

    machine.equipments[MachineType.POSITION_HEAD] = Equipment.assigns(machine.equipments[MachineType.POSITION_HEAD]);
    machine.equipments[MachineType.POSITION_BODY] = Equipment.assigns(machine.equipments[MachineType.POSITION_BODY]);
    machine.equipments[MachineType.POSITION_RIGHTARM] = Equipment.assigns(machine.equipments[MachineType.POSITION_RIGHTARM]);
    machine.equipments[MachineType.POSITION_LEFTARM] = Equipment.assigns(machine.equipments[MachineType.POSITION_LEFTARM]);
    machine.equipments[MachineType.POSITION_RIGHTLEG] = Equipment.assigns(machine.equipments[MachineType.POSITION_RIGHTLEG]);
    machine.equipments[MachineType.POSITION_LEFTLEG] = Equipment.assigns(machine.equipments[MachineType.POSITION_LEFTLEG]); 
    return machine;
  }

  //**Machineインスタンスを生成するヘルパーメソッド */
  // オブジェクトの配列を指定し、Spellsインスタンスの配列に変換する。
  static assigns(array){
    var retVal = [];
    array.forEach(obj => {
      retVal.push(Machine.assign(obj));
    });
    return retVal;
  }
 
}
